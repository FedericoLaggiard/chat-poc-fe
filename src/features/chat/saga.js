import {put, select, takeLatest} from "redux-saga/effects";
import {chatSlice} from "./reducer";
import {request} from "../../utils/request";
import {API_BASE_URL} from "../../env";
import {messageModel} from "./model";
import {selectFirebaseToken} from "../notifications/selectors";
// import {memberModel, messageModel} from "../forum/model";
// import {mediaUpload, uploadMedia} from "../media/saga";
// import {selectRolData} from "../singleRol/selector";
// import {singleRolSlice} from "../singleRol/reducer";

export function* chatSaga() {
    yield takeLatest(chatSlice.actions.setRolIdAction, initChat);
    yield takeLatest(chatSlice.actions.sendMessageAction, sendMessage);
}

function* initChat({payload}){
    yield put(chatSlice.actions.getChatMessagesAction());
}

function* sendMessage({payload}) {
    try {
        if(payload) {
            const firebaseToken = yield select(selectFirebaseToken);
            const message = {
                message: payload,
                firebaseToken,
            };
            const response = yield request(`/api/chats/messages`, "POST", message).then((data) => data);

            if (response.status === 200) {
                const newMessage = messageModel(response.data);
                yield put(chatSlice.actions.sendMessageSuccessAction(newMessage));
            }
        }
    } catch (error) {
        yield put(chatSlice.actions.sendMessage__ErrorAction(error));
    }
}

