import React, {useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import globalStyles from "../../../assets/globalStyles";
import {useTheme} from "@material-ui/core/styles";
import {Grid, IconButton, useMediaQuery} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import {SingleTextInput} from "../../../components/input/SingleTextInput";
import SelectWithOneChoosableOption from "../../../components/input/SelectWithOneChoosableOption";
import {useDispatch, useSelector} from "react-redux";
import {ACCOUNT_ADDRESSES_STORE_NAME, getAccountAddresses, getAccountAddressesStateNames} from "../Receive/redux/accountAddressesSlice";
import DialogActions from "@material-ui/core/DialogActions";
import CustomButton from "../../../components/CustomButton";
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import SimpleInput from "../../../components/input/SimpleInput";
import {isFormValid} from "../../../utils/formUtils";
import {sendMessageStateNames, resetState, sendMessage, MESSAGES_STORE_NAME} from "./redux/messagesInboxSlice";

export const NewMessageDialog = ({open, handleClose}) => {
    const classes = globalStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    const {
        [getAccountAddressesStateNames.entity]: accountAddresses,
        [getAccountAddressesStateNames.loaderIndicator]: accountAddressesLoading
    } = useSelector(state => state[ACCOUNT_ADDRESSES_STORE_NAME]);

    const {
        [sendMessageStateNames.actionCompleted]: messageSendCompleted,
        [sendMessageStateNames.loading]: messageSending
    } = useSelector(state => state[MESSAGES_STORE_NAME]);

    const [addressFrom, setAddressFrom] = useState('');
    const [sendTo, setSendTo] = useState('');
    const [message, setMessage] = useState('');

    const [showValidation, setShowValidation] = useState(false);

    const validationRes = {
        addressFrom: false,
        sendTo: false
    }

    useEffect(() => {
        dispatch(getAccountAddresses());
    }, [dispatch])

    useEffect(() => {
        setAddressFrom('');
        setSendTo('');
        setMessage('');
        setShowValidation(false);
    }, [open]);

    useEffect(() => {
        if (messageSendCompleted){
            resetState({
                resetFunction: (state) => {
                    state[sendMessageStateNames.actionCompleted] = false;
                    return state;
                }
            });
            handleClose();
        }
    }, [messageSendCompleted, handleClose]);

    const getAddressesOptions = (addresses) => {
        return addresses.map((addr) => {
            return {
                id: addr,
                name: addr
            }
        });
    }

    const handleSaveButtonClick = () => {
        setShowValidation(true);

        if (isFormValid(validationRes)) {
            dispatch(sendMessage({
                newConversation: true,
                body: {
                    addressFrom: addressFrom,
                    addressTo: sendTo,
                    message: message
                }
            }));
        }
    }

    return (
        <>
            <Dialog
                fullWidth={true}
                fullScreen={fullScreen}
                open={open}
                onClose={() => handleClose()}
                maxWidth="sm"
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle className={classes.dialogTitle}>
                    <Grid container>
                        <Grid item xs={12}>
                            New conversation
                        </Grid>
                    </Grid>
                    <IconButton aria-label="close" className={classes.closeDialogButton} onClick={() => handleClose()}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>

                <DialogContent className={classes.dialogContent}>
                    <Grid container direction="row" spacing={2}>

                        <Grid item xs={12}>
                            <SelectWithOneChoosableOption label="Address From"
                                                          id={'addressFrom'}
                                                          options={getAddressesOptions(accountAddresses || [])}
                                                          value={addressFrom}
                                                          setter={setAddressFrom}
                                                          isLoading={accountAddressesLoading}
                                                          validate={showValidation}
                                                          validationRes={validationRes}
                                                          validationFailText={'Please select your address'}/>
                        </Grid>

                        <Grid item xs={12}>
                            <SingleTextInput label="Recipient smsginfo of an address"
                                             id={'sendTo'}
                                             value={sendTo}
                                             setter={setSendTo}
                                             validate={showValidation}
                                             validationRes={validationRes}
                                             validationFailText={'Please enter a recipient smsginfo of an address'}/>
                        </Grid>

                        <Grid item xs={12}>
                            <SimpleInput
                                label="Message"
                                id={'message'}
                                value={message}
                                setter={setMessage}
                                fullWidth
                                multiline
                                rows={3}/>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                    <CustomButton
                        variant="contained"
                        color="primary"
                        startIcon={<CloudOutlinedIcon/>}
                        onClick={handleSaveButtonClick}
                        loading={messageSending}
                    >
                        Send
                    </CustomButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
