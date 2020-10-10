import React, {useEffect, useState} from "react";
import globalStyles from "../../../assets/globalStyles";
import {useTheme} from "@material-ui/core/styles";
import {Grid, IconButton, useMediaQuery} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import {SingleTextInput} from "../../../components/input/SingleTextInput";
import {getSingleAddress, getSingleAddressStateNames, SINGLE_ADDRESS_STORE_NAME, resetState} from "./redux/receiveAddressSlice";

export const AddressDialog = ({address, open, handleClose}) => {
    const classes = globalStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    const [addressValue, setAddressValue] = useState('');
    const [addressPublicKey, setAddressPublicKey] = useState('');

    const {
        [getSingleAddressStateNames.entity]: addressPubKey
    } = useSelector(state => state[SINGLE_ADDRESS_STORE_NAME]);

    useEffect(() => {
        if (address) {
            setAddressValue(address);
            dispatch(getSingleAddress(address));
        }
    }, [dispatch, address]);

    useEffect(() => {
        if (!open) {
            setAddressValue('');
            setAddressPublicKey('');
            dispatch(resetState());
        }
    }, [dispatch, open]);

    useEffect(() => {
        if (addressPubKey) {
            setAddressPublicKey(addressValue + ":" + addressPubKey.pubKey)
        }
    }, [addressValue, addressPubKey]);

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
                            Your address
                        </Grid>
                    </Grid>
                    <IconButton aria-label="close" className={classes.closeDialogButton} onClick={() => handleClose()}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>

                <DialogContent className={classes.dialogContent}>
                    <Grid container direction="row" spacing={2}>

                        <Grid item xs={12}>
                            <SingleTextInput label="Address"
                                             id={'address'}
                                             disabled={true}
                                             value={addressValue}/>
                        </Grid>

                        <Grid item xs={12}>
                            <SingleTextInput label="smsginfo of this address (used for messaging)"
                                             id={'smsginfo'}
                                             disabled={true}
                                             value={addressPublicKey}/>
                        </Grid>

                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}
