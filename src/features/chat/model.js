/**
 {
    "data": {
        "message": "{\"id\":376,\"from\":\"TSROLD01\",\"message\":\"8\",\"date\":\"2024-05-16 15:36:27\",\"attachments\":[]}",
        "date": "2024-05-16 13:36:27",
        "typeCode": "CHAT-MESSAGE",
        "rolId": "383",
        "typeDesc": "Chat message",
        "read": "false",
        "content": "Chat message received",
        "id": "100"
    },
    "from": "97712976175",
    "priority": "normal",
    "notification": {
        "title": "ROL 383 - Chat message",
        "body": "You have received a new chat message of ROL 383",
        "click_action": "#/my-rols/383"
    },
    "fcmMessageId": "33b94a0a-6a16-4d77-bb4c-7e56ead53d6b"
}
 */

export const MEMBER_AVATAR_COLORS = [
  "#D4B106",
  "#1677FF",
  "#85A5FF",
  "#876800",
];

export const memberModel = (member, index) => {
  return {
    ...member,
    color: MEMBER_AVATAR_COLORS[index],
  };
};

export const messageModel = (data) => {
  return {
    ...data,
    date: data.date,
    username: data.isFrom,
    firstName: data.isFrom,
    lastName: data.isFrom,
    avatarColor: MEMBER_AVATAR_COLORS[0],
  };
};
export const sendMessageModel = (data, members) => {
  const from = members.find((x) => x.username === data.isFrom);

  return {
    ...data,
    date: data.date,
    username: from ? from.username : "",
    firstName: from ? from.firstName : "",
    lastName: from ? from.lastName : "",
    avatarColor: from ? from.color : "black",
  };
};
