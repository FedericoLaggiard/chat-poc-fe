const isFirstOfGroup = (messages, index, message) => {
    if(index === 0) return true;
    return messages[index - 1].username !== message.username;
}

export default isFirstOfGroup;