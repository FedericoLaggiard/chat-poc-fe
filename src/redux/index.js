import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
import { chatSlice } from "../features/chat/reducer";
import { genericErrorSlice } from "../features/genericError/reducer";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  chat: chatSlice.reducer,
  genericError: genericErrorSlice.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
