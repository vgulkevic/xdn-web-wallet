import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, Grid, IconButton, useMediaQuery} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {useTheme} from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import globalStyles from "../../../assets/globalStyles";
import SimpleInput from "../../../components/input/SimpleInput";
import {getFormattedTimestamp} from "../../../components/Table/headCells/timeHeadCell";

export const TransactionDialog = ({feedItem, open, setOpen}) => {
    const classes = globalStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {!feedItem ? null :
                <Dialog open={open}
                        fullWidth={true}
                        fullScreen={fullScreen}
                        maxWidth="sm"
                        aria-labelledby="responsive-dialog-title"
                        onClose={() => setOpen(false)}
                >
                    <DialogTitle className={classes.dialogTitle}>
                        <Grid container>
                            <Grid item xs={12}>
                                Feed Item Details
                            </Grid>
                        </Grid>
                        <IconButton aria-label="close" className={classes.closeDialogButton} onClick={() => setOpen(false)}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <TransactionInfoField feedItem={feedItem} fieldName={'txId'} label={'Tx id'} fullWidth={true}/>
                            <TransactionInfoField feedItem={feedItem} fieldName={'address'} label={'Address'} fullWidth={true}/>

                            {feedItem.type === 'credit' && getConfirmedStatusForCreditTransaction(feedItem) }

                            <TransactionInfoField feedItem={feedItem} fieldName={'transactionAmount'} label={'Transaction amount'}/>
                            {feedItem.type === 'debit' && <TransactionInfoField feedItem={feedItem} fieldName={'txfee'} label={'Fee'}/>}

                            <TransactionInfoField feedItem={feedItem} fieldName={'type'} label={'Type'}/>
                            <TransactionInfoField feedItem={feedItem} fieldName={'balanceBefore'} label={'Balance before'}/>
                            <TransactionInfoField feedItem={feedItem} fieldName={'balanceAfter'} label={'Balance after'}/>


                            <Grid item xs={12} sm={6}>
                                <SimpleInput type={'text'}
                                             label={'Created at'}
                                             value={getFormattedTimestamp(feedItem.createdAt) + ""}
                                             disabled={true}
                                />
                            </Grid>

                        </Grid>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}

const TransactionInfoField = ({feedItem, fieldName, label, fullWidth}) => {
    return (
        <>
            <Grid item xs={12} sm={fullWidth ? 12 : 6}>
                <SimpleInput type={'text'}
                             label={label}
                             value={(feedItem[fieldName] || "") + ""}
                             disabled={true}
                />
            </Grid>
        </>
    );
}

const getConfirmedStatusForCreditTransaction = (feedItem) => {
    if (feedItem.confirmed === 'true') {
        return (
            <Grid item xs={12} sm={6}>
                <SimpleInput type={'text'}
                             label={'Confirmed'}
                             value={"Yes"}
                             disabled={true}
                />
            </Grid>
        );
    } else {
        return (
            <Grid item xs={12} sm={6}>
                <SimpleInput type={'text'}
                             label={'Confirmed'}
                             value={`Unconfirmed: ${feedItem.confirmations}/6`}
                             disabled={true}
                />
            </Grid>
        );
    }
}
