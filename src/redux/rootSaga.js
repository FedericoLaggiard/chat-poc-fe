import { all, fork } from "redux-saga/effects";
import genericErrorSaga from "../features/genericError/saga";
import { chatSaga } from "../features/chat/saga";

const rootSaga = function* () {
  yield all([
    fork(genericErrorSaga),
    fork(chatSaga),
    // Other sagas
  ]);
};

export default rootSaga;
