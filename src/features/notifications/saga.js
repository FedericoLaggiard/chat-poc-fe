import {
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { notificationsSlice } from "./reducer";
import notificationModel, {
  getNotificationPermission,
  NotificationPermission,
  NotificationTypes,
} from "./model";
import { request } from "../../utils/request";
import DeviceDetector from "device-detector-js";
import { API_BASE_URL } from "../../env";
import NotificationService from "./notificationService";
import { chatSlice } from "../chat/reducer";
// import { selectChatMembers } from "../chat/selectors";
import { messageModel } from "../chat/model";
import {selectNotificationsPermissions} from "./selectors";

export function* notificationSaga() {
  yield takeLatest(notificationsSlice.actions.bootstrapNotificationsAction, bootstrapNotifications);
  yield takeEvery(notificationsSlice.actions.notificationReceivedAction, onNotificationReceived);
  yield takeLatest(notificationsSlice.actions.checkPermissionAction, checkPermissions);
  yield takeLatest(notificationsSlice.actions.getPermissionAction, getPermission);
  yield takeLatest(notificationsSlice.actions.getTokenAction, getToken);
  yield takeLatest(notificationsSlice.actions.setTokenAction, sendTokenToAPI);
  yield takeLatest(notificationsSlice.actions.getNotificationListInitialDataAction, getNotificationList);
}

export function* bootstrapNotifications({ payload }) {
  window.notificationService = new NotificationService();
  const notificationPermissions = yield* checkPermissions();
  if(notificationPermissions !== null){
    const token = yield* getToken();
    yield* sendTokenToAPI({token});
  }
}

function* onNotificationReceived({ payload }) {
  const newMessage = messageModel(payload.data);
  yield put(chatSlice.actions.sendMessageSuccessAction(newMessage));
}

function* showGeneralNotification({ payload }) {
  const notification = notificationModel(payload);
  yield put(notificationsSlice.actions.addNotificationAction(notification));
}

export function* checkPermissions() {
  try {
    const supported = yield call(notificationService.isPushSupported);
    yield put(notificationsSlice.actions.setSupportedAction(supported));

    if (supported === false) {
      console.log("push not supported");
      yield put(
        notificationsSlice.actions.setPermissionAction(
          NotificationPermission.denied
        )
      );
      return NotificationPermission.denied;
    } else {
      if (window && window.Notification) {
        const permissionState = window.Notification.permission;
        console.log("push permission is", permissionState);
        yield put(
          notificationsSlice.actions.setPermissionAction(
            getNotificationPermission(permissionState)
          )
        );
        return getNotificationPermission(permissionState);
      } else {
        throw "Notification object not found";
      }
    }
  } catch (err) {
    console.log(err);
    yield put(notificationsSlice.actions.notifications__ErrorAction(err));
  }
}

export function* getPermission() {
  let permission;
  let permissionRequestCount = 1;
  let permissionState;

  try {
    do {
      permissionState = yield* checkPermissions();

      if (permissionState === NotificationPermission.default) {
        yield call(notificationService.requestPermission);
      }
      permissionRequestCount--;
    } while (permissionRequestCount > 0);

    if (permissionState === NotificationPermission.granted) {
      const firebaseToken = yield* getToken();
      if (firebaseToken) yield* sendTokenToAPI({ token: firebaseToken });
    }

    if (permissionState === NotificationPermission.denied) {
      // todo: permission was denied by user, exit gracefully
      console.log("Permission was denied");
    }

    yield put(
      notificationsSlice.actions.setPermissionAction(
        getNotificationPermission(permission)
      )
    );
    return getNotificationPermission(permission);
  } catch (err) {
    console.log(err);
    yield put(notificationsSlice.actions.notifications__ErrorAction(err));
  }
}

export function* getToken() {
  try {
    const token = yield call(notificationService.getTokenFromFirebase);
    if (token !== "") {
      yield put(notificationsSlice.actions.setTokenAction(token));
    }

    return token;
  } catch (err) {
    console.log(err);
    yield put(notificationsSlice.actions.notifications__ErrorAction(err));
  }
}

export function* sendTokenToAPI({ token }) {
  try {
    if (token) {
      const deviceDetector = new DeviceDetector();
      const userAgent = navigator.userAgent;
      const device = deviceDetector.parse(userAgent);

      let url = `/api/notifications/register`;
      if (token) url = `${url}?firebase-key=${token}`;

      const response = yield request(url, "POST", {
        userAgent: userAgent,
        ...device,
      }).then((data) => data);
    }
  } catch (err) {
    console.log(err);
    yield put(notificationsSlice.actions.notifications__ErrorAction(err));
  }
}
export function* getNotificationList({ payload }) {
  // try {
  //   const response = yield request(
  //     `${API_NOTIFICATION_BASE_URL}/api/notifications${payload}`
  //   ).then((data) => data);
  //   if (response.status === 200) {
  //     yield put(
  //       notificationsSlice.actions.getNotificationListInitialDataSuccessAction(
  //         response.data
  //       )
  //     );
  //   }
  // } catch (error) {
  //   yield put(
  //     notificationsSlice.actions.getNotificationListInitialData__ErrorAction(
  //       error
  //     )
  //   );
  // }
}
