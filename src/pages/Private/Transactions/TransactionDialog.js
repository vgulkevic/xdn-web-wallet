import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle, Grid, IconButton, useMediaQuery} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {useTheme} from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import globalStyles from "../../../assets/globalStyles";
import SimpleInput from "../../../components/input/SimpleInput";
import {getFormattedTimestamp} from "../../../components/Table/headCells/timeHeadCell";

export const TransactionDialog = ({transaction, open, setOpen}) => {
    const classes = globalStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {!transaction ? null :
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
                                Transaction Details
                            </Grid>
                        </Grid>
                        <IconButton aria-label="close" className={classes.closeDialogButton} onClick={() => setOpen(false)}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <TransactionInfoField transaction={transaction} fieldName={'txid'} label={'Tx id'} fullWidth={true}/>
                            <TransactionInfoField transaction={transaction} fieldName={'address'} label={'Address'} fullWidth={true}/>
                            <TransactionInfoField transaction={transaction} fieldName={'blockhash'} label={'Block hash'} fullWidth={true}/>
                            <TransactionInfoField transaction={transaction} fieldName={'amount'} label={'Amount'}/>
                            <TransactionInfoField transaction={transaction} fieldName={'blockindex'} label={'Block index'}/>

                            <Grid item xs={12} sm={6}>
                                <SimpleInput type={'text'}
                                             label={'Block time'}
                                             value={getFormattedTimestamp(transaction.blocktime * 1000) + ""}
                                             disabled={true}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <SimpleInput type={'text'}
                                             label={'Time'}
                                             value={getFormattedTimestamp(transaction.time * 1000) + ""}
                                             disabled={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SimpleInput type={'text'}
                                             label={'Time Received'}
                                             value={getFormattedTimestamp(transaction.timereceived * 1000) + ""}
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

const TransactionInfoField = ({transaction, fieldName, label, fullWidth}) => {
    return (
        <>
            <Grid item xs={12} sm={fullWidth ? 12 : 6}>
                <SimpleInput type={'text'}
                             label={label}
                             value={transaction[fieldName] + ""}
                             disabled={true}
                />
            </Grid>
        </>
    );
}
