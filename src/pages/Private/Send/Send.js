import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Title from "../../../components/Title";
import appStyles from "../../../assets/globalStyles";
import {NumberInput} from "../../../components/input/NumberInput";
import {SingleTextInput} from "../../../components/input/SingleTextInput";
import CustomButton from "../../../components/CustomButton";
import {getWalletInfo, getWalletInfoStateNames, WALLET_INFO_STORE_NAME} from "../Settings/redux/walletInfoSlice";
import {PageLoader} from "../../../components/PageLoader";
import {useTicker} from "../../../hooks/useTicker";
import {ACCOUNT_BALANCE_STORE_NAME, fetchAccountBalance, getAccountBalance, getAccountBalanceStateNames} from "../Dashboard/redux/accountBalanceSlice";
import {ConfirmationDialogWithTextInput} from "../../../components/ConfirmationDialog";
import {isFormValid} from "../../../utils/formUtils";
import {resetState, SEND_TRANSACTION_STORE_NAME, sendTransaction, sendTransactionStateNames} from "./redux/sendTransactionSlice";

export const SEND_PATH = "/send";
export const SEND_MENU_ITEM = "Send";

export const Send = () => {
    const globalStyles = appStyles();
    const dispatch = useDispatch();

    const {
        [getWalletInfoStateNames.entity]: walletInfo,
        [getWalletInfoStateNames.loaderIndicator]: loadingWalletInfo
    } = useSelector(state => state[WALLET_INFO_STORE_NAME]);

    const {
        [getAccountBalanceStateNames.entity]: accountBalance,
        [getAccountBalanceStateNames.loaderIndicator]: accountBalanceLoading
    } = useSelector(state => state[ACCOUNT_BALANCE_STORE_NAME]);

    const {
        [sendTransactionStateNames.entity]: sentTransaction,
        [sendTransactionStateNames.loading]: sendingTransaction,
        [sendTransactionStateNames.actionCompleted]: transactionHasBeenSent
    } = useSelector(state => state[SEND_TRANSACTION_STORE_NAME]);

    const ticker = useTicker();

    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    const [showValidation, setShowValidation] = useState(false);
    const [payToAddress, setPayToAddress] = useState('');
    const [amount, setAmount] = useState('');

    const validationRes = {
        payToAddress: false,
        sum: false
    }

    useEffect(() => {
        dispatch(setCurrentMenuItem(SEND_MENU_ITEM));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAccountBalance());
    }, [dispatch]);

    useEffect(() =>  {
        if (!walletInfo) {
            dispatch(getWalletInfo());
        }
    }, [dispatch, walletInfo]);

    useEffect(() => {
        if (transactionHasBeenSent) {
            setShowValidation(false);
            setAmount('');
            setPayToAddress('');
            dispatch(resetState());
            dispatch(fetchAccountBalance());
        }
    }, [dispatch, transactionHasBeenSent]);

    return (
        <>
            <Grid container
                  spacing={2}
                  direction="row"
                  justify="center"
                  alignItems="stretch">


                <Grid item xs={12}>
                    <Paper className={globalStyles.paperSecondary} style={{height: `100%`, paddingBottom: 0}}>
                        <Grid container>
                            <Grid item xs={12} style={{paddingBottom: `20px`}}>
                                <Title>Send Transaction</Title>
                            </Grid>

                            <Grid item xs={12}>
                                {(!walletInfo || loadingWalletInfo) || (!accountBalance || accountBalanceLoading) ? <PageLoader/> :
                                    <>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <SingleTextInput label="Pay to DigitalNote address"
                                                                 id={'payToAddress'}
                                                                 value={payToAddress}
                                                                 setter={setPayToAddress}
                                                                 validate={showValidation}
                                                                 validationRes={validationRes}
                                                                 validationFailText={'Please enter DigitalNote address to pay'}/>
                                            </Grid>

                                            <Grid item xs={12} style={{paddingBottom: '10px'}}>
                                                <NumberInput label="Amount"
                                                             id={'sum'}
                                                             value={amount}
                                                             setter={setAmount}
                                                             validate={showValidation}
                                                             validationRes={validationRes}
                                                             validationFailText={'Please enter an amount to pay'}
                                                             isFloat={true}/>
                                            </Grid>

                                            <Grid item xs={12} style={{paddingBottom: '15px'}}>
                                                Transaction fee: {walletInfo.paytxfee} {ticker}
                                            </Grid>

                                            <Grid item xs={12}>

                                                <Grid container direction="row" justify="space-between">

                                                    <Grid item>
                                                        Available balance: {accountBalance.balance} {ticker}
                                                    </Grid>

                                                    <Grid item>
                                                        <CustomButton color="secondary"
                                                                      variant="contained"
                                                                      noMargin={true}
                                                                      loading={sendingTransaction}
                                                                      onClick={() => {
                                                                          setShowValidation(true);

                                                                          if (isFormValid(validationRes)) {
                                                                              setAmount(parseFloat(amount.replace(/[.]/g, (i => m => !i++ ? m : '')(0))) + "");
                                                                              setConfirmationDialogOpen(true);
                                                                          }
                                                                      }}>
                                                            Send
                                                        </CustomButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                        <ConfirmationDialogWithTextInput open={confirmationDialogOpen} title={'Confirm transaction'}
                                                                         confirmationRequired={true} cancelCallback={() => setConfirmationDialogOpen(false)}
                                                                         applyCallback={() => {
                                                                             setConfirmationDialogOpen(false);
                                                                             dispatch(sendTransaction({
                                                                                 body: {
                                                                                     amount: amount,
                                                                                     toAddress: payToAddress
                                                                                 }
                                                                             }));
                                                                         }}
                                                                         description={
                                                                             <>Are you sure you want to send<br/><br/>
                                                                                 <div style={{textAlign: 'center', fontWeight: 'bold'}}>{parseFloat(walletInfo.paytxfee) + parseFloat(amount)} {ticker}</div>
                                                                                 <br/>
                                                                                 to <br/><br/>
                                                                                 <div style={{textAlign: 'center', fontWeight: 'bold'}}>{payToAddress}</div>
                                                                             </>
                                                                         }/>
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
