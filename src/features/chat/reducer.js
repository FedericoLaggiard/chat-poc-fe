import { createSlice } from "@reduxjs/toolkit";

export const CHAT = "CHAT";

const initialChatState = {
    isLoading: false,
    rolid: "",
    chatid: "",
    members: [],
    messages: [],
    attachments: [],
    tempMedia: [],
    errors: "",
};

export const chatSlice = createSlice({
    name: CHAT,
    initialState: initialChatState,
    reducers: {
        setChatIdAction: (state, { payload }) => {
            state.chatid = payload;
        },
        setRolIdAction: (state, { payload }) => {
            state.rolid = payload;
        },
        getChatMessagesAction: (state, { payload }) => {
            state.isLoading=true;
            state.members=[];
            state.messages=[];
            state.attachments=[];
            state.errors="";
        },
        getChatMessagesSuccessAction: (state, { payload }) => {
            state.isLoading=false;
            state.members=payload.members;
            state.messages=payload.messages;
            state.attachments=payload.attachments;
            state.tempMedia=[];
            state.errors="";
        },
        getChatMessages__ErrorAction: (state, { payload }) => {
            state.isLoading=false;
            state.members=[];
            state.messages=[];
            state.attachments=[];
            state.errors=payload;
        },
        sendMessageAction: (state, { payload }) => {
            state.isLoading=true;
            state.errors="";
        },
        sendMessageSuccessAction: (state, { payload }) => {
            state.isLoading=false;
            if(!state.messages) state.messages = [];
            // if(payload.attachments && payload.attachments.length > 0){
            //     if(!state.attachments) state.attachments = [];
            //     state.attachments = state.attachments.concat(payload.attachments);
            //     payload.attachments = payload.attachments.map(x => x.id);
            // }
            state.messages.push(payload);
            state.tempMedia = [];
            state.errors="";
        },
        sendMessage__ErrorAction: (state, { payload }) => {
            state.isLoading=false;
            state.errors=payload;
            state.tempMedia = [];
        },
        addMediaAction: (state, { payload }) => {
            state.isLoading = true;
            state.errors = "";
        },
        addMediaSuccessAction: (state, { payload }) => {
            state.isLoading = false;
            if(!state.tempMedia) state.tempMedia = [];
            state.tempMedia.push(payload);
            state.errors = "";
        },
        addMedia__ErrorAction: (state, { payload }) => {
            state.isLoading = false;
            state.errors = payload;
        },
        removeTempMediaAction: (state, { payload }) => {
            state.tempMedia = state.tempMedia.filter((media) => media.file.uid !== payload.uid);
        },
    }
});

export const {
    setChatIdAction,
    setRolIdAction,
    getChatMessagesAction,
    getChatMessagesSuccessAction,
    getChatMessages__ErrorAction,
    sendMessageAction,
    sendMessageSuccessAction,
    sendMessage__ErrorAction,
    addMediaAction,
    addMediaSuccessAction,
    addMedia__ErrorAction,
    removeTempMediaAction,
} = chatSlice.actions;

export default chatSlice.reducer;