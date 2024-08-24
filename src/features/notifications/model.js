import createEnum from "../../utils/createEnum";
import dayjs from "dayjs";

//https://developer.mozilla.org/en-US/docs/Web/API/Notification
export const NotificationPermission = createEnum([
  "denied",
  "granted",
  "default", // The user choice is unknown and therefore the browser will act as if the value were denied.
]);
export const getNotificationPermission = (permissionAsString) => {
  switch (permissionAsString) {
    case NotificationPermission.denied:
      return NotificationPermission.denied;
    case NotificationPermission.granted:
      return NotificationPermission.granted;
    default:
      return NotificationPermission.default;
  }
};

export const NotificationTypes = {
  CHAT_MESSAGE: "CHAT-MESSAGE",
};

const getType = (typeAsString) => {
  switch (typeAsString) {
    case NotificationTypes.CHAT_MESSAGE:
      return NotificationTypes.CHAT_MESSAGE;
  }
  throw `Not in range error, ${typeAsString}`;
};

const notificationModel = (data) => {
  if(!data) return {};
  return {
    id: data.messageId,
    type: getType(data.data?.typeCode),
    title: data.notification?.title,
    body: data.notification?.body,
    link: data.fcmOptions?.link,
    message: data.data?.message ? JSON.parse(data.data?.message) : null,
    read: false,
    receivedAt: dayjs(),
  };
};

export default notificationModel;
