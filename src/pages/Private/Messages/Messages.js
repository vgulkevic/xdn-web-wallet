import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";
import {getAccountMessages, getAccountMessagesStateNames, MESSAGES_STORE_NAME} from "./redux/messagesInboxSlice";
import Paper from "@material-ui/core/Paper";
import {BasicTableToolbar} from "../../../components/Table/BasicTableToolbar";
import {EnhancedTable} from "../../../components/Table/Table";
import appStyles from "../../../assets/globalStyles";
import {timeHeadCell} from "../../../components/Table/headCells/timeHeadCell";
import {CreateNewButton} from "../../../components/buttons";
import {NewMessageDialog} from "./NewMessageDialog";
import {ConversationDialog} from "./Conversation/ConversationDialog";

export const MESSAGES_PATH = "/messages";
export const MESSAGES_MENU_ITEM = "Messages";

const headCells = [
    {id: 'yourAddress', label: 'My address'},
    {id: 'theirAddress', label: 'Their address'},
    timeHeadCell('timestamp', 'Time', (el) => el.mostRecentTimeStamp),
    {id: 'text', label: ''}
]

export const Messages = () => {
    const classes = appStyles();
    const dispatch = useDispatch();
    const [newMessageDialogOpen, setNewMessageDialogOpen] = useState(false);
    const [conversationDialogOpen, setConversationDialogOpen] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(null);

    const {
        [getAccountMessagesStateNames.entity]: messages,
        [getAccountMessagesStateNames.loaderIndicator]: messagesLoading
    } = useSelector(state => state[MESSAGES_STORE_NAME]);

    useEffect(() => {
        dispatch(setCurrentMenuItem(MESSAGES_MENU_ITEM));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAccountMessages());
    }, [dispatch]);

    return (
        <>
            <Paper className={classes.paper}>
                <BasicTableToolbar pageTitle="Conversations">
                    <CreateNewButton
                        onClick={() => {
                            setNewMessageDialogOpen(true)
                        }}
                        overridenText={'New conversation'}
                    />
                </BasicTableToolbar>
                <EnhancedTable headCells={headCells} tableElements={Object.values(messages || {}) || []} isLoading={messagesLoading}
                               tableElementOnClick={(conversation) => {
                                   setSelectedConversation(conversation);
                                   setConversationDialogOpen(true);
                               }}/>
            </Paper>

            <NewMessageDialog open={newMessageDialogOpen} handleClose={() => {
                setNewMessageDialogOpen(false)
            }}/>
            {selectedConversation &&
            <ConversationDialog conversationId={selectedConversation.id}
                                conversationMessages={selectedConversation.messages}
                                theirAddress={selectedConversation.theirAddress}
                                yourAddress={selectedConversation.yourAddress}
                                open={conversationDialogOpen}
                                handleClose={() => {
                                    setConversationDialogOpen(false);
                                    setSelectedConversation(null);
                                }}/>
            }
        </>
    );
}
