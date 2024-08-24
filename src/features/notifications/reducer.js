import { createSlice } from "@reduxjs/toolkit";
export const NOTIFICATIONS = "NOTIFICATIONS";

const notificationsState = {
  loading: false,
  supported: false,
  permission: null,
  firebaseToken: "",
  notifications: [],
  notificationListData: null,
};

export const notificationsSlice = createSlice({
  name: NOTIFICATIONS,
  initialState: notificationsState,
  reducers: {
    checkPermissionAction: (state, { payload }) => {
      state.loading = true;
    },
    setSupportedAction: (state, { payload }) => {
      state.loading = false;
      state.supported = payload;
    },
    getPermissionAction: (state, { payload }) => {
      state.loading = true;
    },
    setPermissionAction: (state, { payload }) => {
      state.loading = false;
      state.permission = payload;
    },
    getTokenAction: (state, { payload }) => {
      state.loading = true;
    },
    setTokenAction: (state, { payload }) => {
      state.loading = false;
      state.firebaseToken = payload;
    },
    notificationReceivedAction: (state, { payload }) =>{},
    addNotificationAction: (state, { payload }) => {
      state.notifications = state.notifications.concat(payload);
    },
    setNotificationReadAction: (state, { payload }) => {
      console.log(payload)
      const notification = state.notifications.find(
        (notification) => notification.id === payload.id
      );
      if (notification) {
        notification.read = true;
      }
    },
    notifications__ErrorAction: (state, { payload }) => {},
    getNotificationListInitialDataAction: (state, { payload }) => {
      state.loading = true;
      state.errors = "";
      state.notificationListData = null;
    },
    getNotificationListInitialData__ErrorAction: (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
      state.notificationListData = null;
    },
    getNotificationListInitialDataSuccessAction: (state, { payload }) => {
      state.loading = false;
      state.errors = "";
      state.notificationListData = payload;
    },
    bootstrapNotificationsAction: (state, {payload}) => {},
  },
});

export const {
  setSupportedAction,
  getPermissionAction,
  setPermissionAction,
  checkPermissionAction,
  getTokenAction,
  setTokenAction,
  notificationReceivedAction,
  addNotificationAction,
  setNotificationReadAction,
  notifications__ErrorAction,
  getNotificationListInitialDataAction,
  getNotiicationInitialData__ErrorAction,
  getNotificationInitialDataSuccessAction,
  bootstrapNotificationsAction,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
