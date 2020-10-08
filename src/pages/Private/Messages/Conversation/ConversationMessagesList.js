import React from "react";
import {ConversationMessageText} from "./ConversationMessageText";
import {useSelector} from "react-redux";
import {CONVERSATION_STATE_STORE_NAME} from "./redux/conversationStateSlice";

export const ConversationMessagesList = () => {

    const {messages} = useSelector(state => state[CONVERSATION_STATE_STORE_NAME]);

    return (
        <>
            {messages.map((msg, index) => {
                return (
                    <ConversationMessageText
                        key={index}
                        isMine={msg.isMine}
                        startsSequence={msg.startsSequence}
                        endsSequence={msg.endsSequence}
                        showTimestamp={msg.showTimestamp}
                        data={msg.data}
                    />
                );
            })}
        </>
    );
}
