import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../../redux/utils/reducerFunctionsFactory";
import {enrichMessageModel} from "../../util/messageUtil";

const CONVERSATION_STATE_STORE_NAME = 'CONVERSATION_STATE_STORE_NAME';

const initialState = {
    conversationId: null,
    messages: [],
    triggerScrollUpdate: false
}

const conversationStateSlice = createSlice ({
    name: 'conversationSlice',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState),
        setConversationMessages: (state, action) => {
            state.conversationId = action.payload.conversationId;
            state.messages = mapMessages(action.payload.messages);

            return state;
        },
        newMessageUpdate: (state, action) => {
            state.triggerScrollUpdate = true;
            const msg = action.payload.data;
            const type = action.payload.type;
            const outMessage = type === "messagesOut";

            enrichMessageModel({...msg}, outMessage);

            const msgConversationId = outMessage ? msg.from + "-" + msg.to : msg.to + "-" + msg.from;

            if (state.conversationId !== msgConversationId) {
                return state;
            }


            const length = state.messages.length;


            // update current last message
            let previous, current, next;
            if (length - 2 >= 0) {
                previous = state.messages[length - 2].data;
            }
            if (length !== 0) {
                current = state.messages[length - 1].data;
                next = msg;

                state.messages[length - 1] = buildModel(previous, current, next);
            }

            // add next message
            next = null;
            current = msg;
            if (length !== 0) {
                previous = state.messages[length-1].data;
            }
            state.messages.push(buildModel(previous, current, next));

            return state;
        }
    }
});

const milliseconds = (h, m, s) => ((h * 60 * 60 + m * 60 + s) * 1000);

const mapMessages = (messageList) => {

    const messages = messageList.slice().sort((a, b) => {
        return a.timestamp.getTime() - b.timestamp.getTime();
    });

    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
        let previous = messages[i - 1];
        let current = messages[i];
        let next = messages[i + 1];

        tempMessages.push(
            buildModel(previous, current, next)
        );

        // Proceed to the next message.
        i += 1;
    }
    return tempMessages;
}

const buildModel = (previous, current, next) => {
    let isMine = current.isOutMessage;
    let currentMoment = current.timestamp;
    let prevBySameAuthor = false;
    let nextBySameAuthor = false;
    let startsSequence = true;
    let endsSequence = true;
    let showTimestamp = true;

    if (previous) {
        let previousMoment = previous.timestamp;
        let previousDuration = currentMoment.getTime() - previousMoment.getTime();
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration < milliseconds(1)) {
            startsSequence = false;
        }

        if (previousDuration < milliseconds(1)) {
            showTimestamp = false;
        }
    }

    if (next) {
        let nextMoment = next.timestamp;
        let nextDuration = nextMoment.getTime() - currentMoment.getTime();
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration < milliseconds(1)) {
            endsSequence = false;
        }
    }

    return {
        isMine: isMine,
        startsSequence: startsSequence,
        endsSequence: endsSequence,
        showTimestamp: showTimestamp,
        data: current
    }
}

const conversationMessagesReducer = conversationStateSlice.reducer;
const resetState = conversationStateSlice.actions.resetState;
const setConversationMessages = conversationStateSlice.actions.setConversationMessages;
const newMessageUpdate = conversationStateSlice.actions.newMessageUpdate;

export {
    // store name
    CONVERSATION_STATE_STORE_NAME,

    // reducer actions
    resetState, setConversationMessages, newMessageUpdate,

    // main reducer
    conversationMessagesReducer
}
