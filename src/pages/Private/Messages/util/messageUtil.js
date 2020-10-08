
const enrichMessageModel = (msg, isOutMessage) => {
    msg.isOutMessage = isOutMessage;
    msg.timestamp = new Date(msg.received || msg.sent);
    msg.author = msg.from;

    return msg;
}

export {
    enrichMessageModel
}
