importScripts('https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function(registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
    });
}

const channel = new BroadcastChannel('chat-poc-serviceworker');
channel.onmessage = function(e) {
    console.log("[worker] Received msg from app", e.data.type);
    if(e.data.type === "init"){
        initFirebase(e.data.config);
    }
}

const initFirebase = (config) => {
    firebase.initializeApp(config);

    const isSupported = firebase.messaging.isSupported();
    // if (isSupported) {
    //     const messaging = firebase.messaging();
    //     messaging.onBackgroundMessage((payload) => {
    //         channel.postMessage( payload );
    //     });
    //
    // }
}

self.addEventListener('notificationclick', function(event) {
    // event.notification.close();
    //
    // var promise = new Promise(function(resolve) {
    //     setTimeout(resolve, 500);
    // }).then(function() {
    //     return clients.openWindow(event.notification.data);
    // });
    // event.waitUntil(promise);
});

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener("push", function(event) {
    console.log("[Service Worker] Push Received.", event.data.text());
    const options = {
        body: JSON.parse(event.data.text()).data.content,
    };
    event.waitUntil(self.registration.showNotification("New notification", options));
    channel.postMessage(  event.data.json() );
});