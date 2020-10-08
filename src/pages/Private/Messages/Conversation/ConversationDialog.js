import React, {useEffect, useRef, useState} from "react";
import globalStyles from "../../../../assets/globalStyles";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid, IconButton, useMediaQuery} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import SimpleInput from "../../../../components/input/SimpleInput";
import CustomButton from "../../../../components/CustomButton";
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import './Message.css'
import {MESSAGES_STORE_NAME, sendMessage, resetState, sendMessageStateNames} from "../redux/messagesInboxSlice";
import {ConversationMessagesList} from "./ConversationMessagesList";
import {setConversationMessages, resetState as resetConversationState, CONVERSATION_STATE_STORE_NAME} from "./redux/conversationStateSlice";

const useStyles = makeStyles((theme) => ({
    conversationBody: {
        maxHeight: '420px',
        overflow: 'scroll'
    },
}));

export const ConversationDialog = ({open, handleClose, conversationMessages, yourAddress, theirAddress, conversationId}) => {
    const messagesEndRef = useRef(null)
    const localClasses = useStyles();
    const classes = globalStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    const {
        [sendMessageStateNames.actionCompleted]: messageSendCompleted,
        [sendMessageStateNames.loading]: messageSending
    } = useSelector(state => state[MESSAGES_STORE_NAME]);



    const {
        triggerScrollUpdate
    } = useSelector(state => state[CONVERSATION_STATE_STORE_NAME]);

    const [newMessage, setNewMessage] = useState('');

    const scrollToBottom = () => {
        if (messagesEndRef && messagesEndRef.current)
            messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        dispatch(setConversationMessages({
            messages: conversationMessages,
            conversationId: conversationId
        }));
        return () => {
            dispatch(resetConversationState());
        }
    }, [dispatch, conversationId, conversationMessages]);

    useEffect(() => {
        if (triggerScrollUpdate) {
            scrollToBottom();
            dispatch(resetConversationState({
                resetFunction: (state) => {
                    state['triggerScrollUpdate'] = false;
                    return state;
                }
            }));
        }
    }, [dispatch, triggerScrollUpdate]);

    useEffect(() => {
        if (messageSendCompleted) {
            setNewMessage('');
            dispatch(resetState({
                resetFunction: (state) => {
                    state[sendMessageStateNames.actionCompleted] = false;
                    return state;
                }
            }));
            // handleClose();
        }
    }, [dispatch, messageSendCompleted]);

    const handleSaveButtonClick = () => {
        // scrollToBottom()
        dispatch(sendMessage({
            body: {
                addressFrom: yourAddress,
                addressTo: theirAddress,
                message: newMessage
            }
        }));
    }

    return (
        <>
            {conversationMessages &&
            <>
                <Dialog
                    fullWidth={true}
                    fullScreen={fullScreen}
                    open={open}
                    onClose={() => handleClose()}
                    maxWidth="md"
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle className={classes.dialogTitle}>
                        <Grid container>
                            <Grid item xs={12}>
                                Conversation
                            </Grid>
                        </Grid>
                        <IconButton aria-label="close" className={classes.closeDialogButton} onClick={() => handleClose()}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>

                    <DialogContent className={classes.dialogContent}>
                        <Grid container direction="row" spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <SimpleInput
                                    type={'text'}
                                    label={`My address`}
                                    value={`${yourAddress}`}
                                    disabled={true}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <SimpleInput
                                    type={'text'}
                                    label={`Their address`}
                                    value={`${theirAddress}`}
                                    disabled={true}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container id={'conversationBody'} className={localClasses.conversationBody}>
                                    <ConversationMessagesList/>
                                    <div ref={messagesEndRef}/>
                                </Grid>
                            </Grid>


                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    <SimpleInput
                                        label="Message"
                                        id={'message'}
                                        value={newMessage}
                                        setter={setNewMessage}
                                        fullWidth
                                        multiline
                                        rows={3}/>
                                </Grid>

                                <Grid item xs={12} style={{textAlign: 'right'}}>
                                    <CustomButton
                                        variant="contained"
                                        color="primary"
                                        startIcon={<CloudOutlinedIcon/>}
                                        onClick={handleSaveButtonClick}
                                        loading={messageSending}
                                    >
                                        Send
                                    </CustomButton>
                                </Grid>
                            </Grid>

                        </Grid>
                    </DialogContent>
                </Dialog>
            </>
            }
        </>
    );
}
