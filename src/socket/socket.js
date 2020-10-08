import io from 'socket.io-client';
import {profile} from "../profile";
import {newMessageUpdate} from "../pages/Private/Messages/redux/messagesInboxSlice";
import {newMessageUpdate as dialogNewMessageUpdate} from "../pages/Private/Messages/Conversation/redux/conversationStateSlice"

let socket;
export const initiateSocket = (apiKey) => {
    socket = io(profile.socketUrl, {secure: true});
    if (socket && apiKey) {
        socket.emit('subscribe', apiKey);
    }

    socket.on('reconnect', (attemptNumber) => {
        console.log("reconnected");
        if (apiKey) {
            socket.emit('subscribe', apiKey);
        }
    });
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) {
        socket.disconnect();
    }
}

export const subscribeToUpdates = (dispatch) => {
    if (!socket) {
        return true;
    }

    socket.on('update', msg => {
        if (msg.type === "messagesIn" || msg.type === "messagesOut") {
            dispatch(newMessageUpdate(msg));
            dispatch(dialogNewMessageUpdate(msg));
        }
    });
}
