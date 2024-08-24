import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
import { chatSlice } from "../features/chat/reducer";
import { genericErrorSlice } from "../features/genericError/reducer";
import {notificationsSlice} from "../features/notifications/reducer";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  genericError: genericErrorSlice.reducer,
  chat: chatSlice.reducer,
  notifications: notificationsSlice.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
