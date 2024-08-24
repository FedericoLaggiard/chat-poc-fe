export const chatFooter = {
    width: "90%",
    padding: "20px 20px",
};
export const chatControls = {
    display: "flex",
};
export const chatInput = {
    flex: 2,
    width: "90%",
    marginRight: "8px",
};
export const fileList = {

};
export const chatName = {
    fontSize: "10px",
};
export const chatDate = {
    fontSize: "10px",
    marginLeft: "16px",
    color: "rgba(36, 36, 38, 0.65)",
};
export const chatMessage = {
    display: "inline-block",
    maxWidth: "89%",
    marginRight: "10px",
    marginLeft: "10px",
    verticalAlign: "middle",
    fontSize: "10px",

    "& .ant-col, .ant-row": {
        fontSize: "12px",
    }
};
export const chatTime = {
    display: "inline-block",
    textAlign: "right",
    color: "rgba(36, 36, 38, 0.65)",
    verticalAlign: "middle",
    fontSize: "10px",
    margin: "auto",
};
export const chatAvatar = {
    marginTop: "auto",
};
export const chatItem = {
    marginTop: "4px",
};
export const lastOfGroup = {
    marginBottom: "16px",
};
export const chatCard = {
    marginTop: "4px",
    width: "fit-content",

    "& .ant-card": {
        width: "fit-content",
        boxShadow: "none",
    },
    "& .ant-card-body": {
        width: "fit-content",
        padding: "10px 16px",
    },
};
export const chatCardUser = {
    marginTop: "4px",
    width: "fit-content",
    display: "flex",
    justifyContent: "flex-end",

    "& .ant-card": {
        width: "fit-content",
    },
    "& .ant-card-body": {
        width: "fit-content",
        padding: "10px 16px",
    },
}
export const chatAttachmentBox = {
    padding: "10px",
    backgroundColor: "gray",
    borderRadius: "5px",
}
export const attachmentBox = {
    width: "57px",
    height: "57px",
    borderRadius: "5px",
    padding: "5px",
    border: "1px solid rgba(217, 217, 217, 1)",
}
export const chatAttachmentContainer = {
    margin: "5px",
    cursor: "pointer",
}

export default {
    chatAttachmentContainer,
    chatAttachmentBox,
    attachmentBox,
    chatName,
    chatDate,
    chatFooter,
    chatControls,
    chatInput,
    fileList,
    chatTime,
    chatAvatar,
    chatMessage,
    chatItem,
    lastOfGroup,
    chatCard,
    chatCardUser,
}