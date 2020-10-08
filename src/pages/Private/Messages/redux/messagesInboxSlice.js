import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {makeAsyncSliceActions} from "../../../../redux/utils/asyncSliceActionFactory";
import {getHttpClient} from "../../../../utils/axiosUtil";
import {enrichMessageModel} from "../util/messageUtil";


const MESSAGES_STORE_NAME = 'MESSAGES_STORE_NAME';

const {
    initialState: getAccountMessagesInitialState,
    thunk: getAccountMessages,
    reducers: getAccountMessagesExtraReducers,
    stateNames: getAccountMessagesStateNames
} = makeAsyncSliceActions(
    {
        actionName: "getAccountMessages",
        storeName: MESSAGES_STORE_NAME,
        entityNameInStore: "accountMessages",
        thunkName: "/account/messages/get",
        thunkAction: async (arg, thunkPI) => {
            let res = await getHttpClient().get('/messages');
            return mapToModel(res.data);
        },
        showToastOnFail: true
    }
);

const {
    initialState: sendMessageInitialState,
    thunk: sendMessage,
    reducers: sendMessageExtraReducers,
    stateNames: sendMessageStateNames
} = makeAsyncSliceActions(
    {
        actionName: "sendMessage",
        storeName: MESSAGES_STORE_NAME,
        entityNameInStore: "sendMessage",
        thunkName: "/account/messages/send",
        thunkAction: async (arg, thunkPI) => {
            await getHttpClient().post(arg.newConversation ? '/new-conversation' : '/message', arg.body);
            return {};
        },
        showToastOnSuccess: true,
        showToastOnFail: true
    }
);

const initialState = {
    ...getAccountMessagesInitialState,
    ...sendMessageInitialState
}

const accountMessagesSlice = createSlice({
    name: 'accountMessages',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState),
        newMessageUpdate: (state, action) => {
            const newMessageUpdate = action.payload;
            buildConversationObject(state[getAccountMessagesStateNames.entity], newMessageUpdate.data, newMessageUpdate.type === "messagesOut")
            return state;
        }
    },
    extraReducers: {
        ...getAccountMessagesExtraReducers,
        ...sendMessageExtraReducers
    }
});

const accountMessagesReducer = accountMessagesSlice.reducer;
const resetState = accountMessagesSlice.actions.resetState;
const newMessageUpdate = accountMessagesSlice.actions.newMessageUpdate;

export {
    // store name
    MESSAGES_STORE_NAME,

    // actions
    getAccountMessages, sendMessage,

    //state names
    getAccountMessagesStateNames, sendMessageStateNames,

    // reducer actions
    resetState, newMessageUpdate,


    // main reducer
    accountMessagesReducer
}

const getMessageExcerpt = (text) => {
    if (!text) {
        return "";
    }
    
    if (text.length > 20) {
        return text.substring(0, 17) + "...";
    }

    return text;
}

const buildConversationObject = (conversations, msg, outMessage) => {
    if (!msg.to || !msg.from) {
        return;
    }

    enrichMessageModel(msg, outMessage);

    const conversationId = outMessage ? msg.from + "-" + msg.to : msg.to + "-" + msg.from;

    if (!conversations[conversationId]) {
        conversations[conversationId] = {
            id: conversationId,
            yourAddress: outMessage ? msg.from : msg.to,
            theirAddress: outMessage ? msg.to : msg.from,
            messages: [msg],
            mostRecentTimeStamp: new Date(msg.received || msg.sent),
            text: getMessageExcerpt(msg.text)
        };
    } else {
        conversations[conversationId].messages.push(msg);

        if (conversations[conversationId].mostRecentTimeStamp < new Date(msg.received || msg.sent)) {
            conversations[conversationId].id = conversationId;
            conversations[conversationId].yourAddress = outMessage ? msg.from : msg.to;
            conversations[conversationId].theirAddress = outMessage ? msg.to : msg.from;
            conversations[conversationId].mostRecentTimeStamp = new Date(msg.received || msg.sent)
            conversations[conversationId].text = getMessageExcerpt(msg.text);
        }
    }
}

const mapToModel = (serverMgObj) => {
    
    const conversations = {};

    serverMgObj.messages.messagesIn.forEach((msg) => {
        buildConversationObject(conversations, msg, false)
    });

    serverMgObj.messages.messagesOut.forEach((msg) => {
        buildConversationObject(conversations, msg, true)
    });

    return conversations;
}
