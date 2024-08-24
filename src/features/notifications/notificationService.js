import  * as firebase  from 'firebase/app';
import { getMessaging, getToken, onMessage, deleteToken, isSupported } from 'firebase/messaging';
import {notificationReceivedAction} from "./reducer";
import store from '../../redux';
import {FIREBASE_CONFIG, FIREBASE_VAPID_KEY} from "../../env";

const firebaseConfig = FIREBASE_CONFIG;

let app;
let messaging;

const channel = new BroadcastChannel('chat-poc-serviceworker');
channel.onmessage = function(e) {
    store.dispatch(notificationReceivedAction(e.data));
};

const startBGWorker = () => {
    channel.postMessage({
        type: "init",
        config: firebaseConfig,
    });
}

const isPushSupported = async () => {
    return isSupported();
}

const requestPermission = async () => {
    console.log('Requesting permission...');
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        console.log('Notification permission granted.');
    } else {
        console.log('Unable to get permission to notify.');
    }

    return permission;
}

const getTokenFromFirebase = async (retry = 0) => {
    try{
        const token = await getToken(messaging, {
            vapidKey: FIREBASE_VAPID_KEY
        });
        if(!token){
            console.log("Unable to retrieve Firebase token, ending..");
            return null;
        }
        console.log("Firebase token is", token);
        return token;
    }catch(err) {
        console.log('Error retrieving registration token. ', err);

        // known firebase issue, see https://github.com/firebase/firebase-js-sdk/issues/7575#issuecomment-1711705543
        if(err.name === "AbortError" && err.message.includes("no active Service Worker")){
            // if(retry < 3)
                return getTokenFromFirebase(retry + 1);
        }

        return null;
    }
}

const deleteTokenFromFirebase = async () => {
    try{
        const currentToken = await getToken(messaging);
        try{
            // Delete registration token.
            const resp = await deleteToken(messaging);
            //TODO remove token from API
            console.log('Token deleted.', currentToken);
        }catch(err) {
            console.log('Unable to delete token. ', err);
            return null;
        }
    }catch(err) {
        console.log('Error retrieving registration token. ', err);
        return null;
    }
}

const init = () => {
    try {
        app = firebase.initializeApp(firebaseConfig);
        // Initialize Firebase Cloud Messaging and get a reference to the service
        messaging = getMessaging(app);
        // Start Background service worker, sending the correct configuration
        startBGWorker();

        // Handle incoming messages. Called when:
        // - a message is received while the app has focus
        // - the user clicks on an app notification created by a service worker
        //   `messaging.onBackgroundMessage` handler.
        onMessage(messaging, (payload) => {
            console.log('FOREGROUND Message received. ', payload);
            store.dispatch(notificationReceivedAction(payload));
        });
    }catch(err){
        console.log(err);
    }
}

function NotificationService() {
    init();

    return {
        isPushSupported,
        requestPermission,
        getTokenFromFirebase,
        deleteTokenFromFirebase,
    }
}

export default NotificationService;