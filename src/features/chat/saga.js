import {put, select, takeLatest} from "redux-saga/effects";
import {chatSlice} from "./reducer";
import {request} from "../../utils/request";
import {API_BASE_URL} from "../../env";
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
            const message = {
                message: payload,
            };
            const response = yield request(`${API_BASE_URL}/api/chats/messages`, "POST", message).then((data) => data);

            if (response.status === 200) {

                // const members = yield select(selectChatMembers);
                // const newMessage = messageModel(response.data, members);
                //
                // yield put(chatSlice.actions.sendMessageSuccessAction(newMessage));
                //
                // if(mediaIdList.length > 0) {
                //     // increase attachment count in order to signal the refresh of the rol attachments list
                //     yield put(singleRolSlice.actions.increaseChatAttachmentCountAction());
                // }
            }
        }
    } catch (error) {
        yield put(chatSlice.actions.sendMessage__ErrorAction(error));
    }
}

