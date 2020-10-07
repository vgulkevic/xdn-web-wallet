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
import {ConversationMessageText} from "./ConversationMessageText";
import './Message.css'
import {MESSAGES_STORE_NAME, resetState, sendMessage, sendMessageStateNames} from "../redux/messagesInboxSlice";

const useStyles = makeStyles((theme) => ({
    conversationBody: {
        maxHeight: '420px',
        overflow: 'scroll'
    },
}));

export const ConversationDialog = ({open, handleClose, conversationMessages, yourAddress, theirAddress}) => {
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

    const [newMessage, setNewMessage] = useState('');


    const scrollToBottom = () => {
        if (messagesEndRef && messagesEndRef.current)
            messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    useEffect(scrollToBottom, [conversationMessages]);

    useEffect(() => {
        if (messageSendCompleted){
            resetState({
                resetFunction: (state) => {
                    state[sendMessageStateNames.actionCompleted] = false;
                    return state;
                }
            });
            // handleClose();
        }
    }, [messageSendCompleted]);

    const milliseconds = (h, m, s) => ((h * 60 * 60 + m * 60 + s) * 1000);

    const renderMessages = () => {
        const messages = conversationMessages.slice().sort((a, b) => {
            return a.timestamp.getTime() - b.timestamp.getTime();
        });

        let i = 0;
        let messageCount = messages.length;
        let tempMessages = [];

        while (i < messageCount) {
            let previous = messages[i - 1];
            let current = messages[i];
            let next = messages[i + 1];
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

            tempMessages.push(
                <ConversationMessageText
                    key={i}
                    isMine={isMine}
                    startsSequence={startsSequence}
                    endsSequence={endsSequence}
                    showTimestamp={showTimestamp}
                    data={current}
                />
            );

            // Proceed to the next message.
            i += 1;
        }

        return tempMessages;
    }

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
                                    {renderMessages()}
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
