const isLastOfGroup = (messages, index, message) => {
    if(index + 1 > messages.length - 1) return true;
    return messages[index + 1].username !== message.username;
}

export default isLastOfGroup;