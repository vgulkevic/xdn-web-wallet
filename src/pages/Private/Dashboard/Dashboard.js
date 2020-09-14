import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";
import {ACCOUNT_BALANCE_STORE_NAME, getAccountBalance, getAccountBalanceStateNames} from "./redux/accountBalanceSlice";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Title from "../../../components/Title";
import appStyles from "../../../assets/globalStyles";
import {PageLoader} from "../../../components/PageLoader";
import {useTicker} from "../../../hooks/useTicker";
import {getLatestTransactions} from "./redux/latestTransactionsSlice";
import {TransactionList} from "./TransactionList";

export const DASHBOARD_PATH = "/dashboard";
export const DASHBOARD_MENU_ITEM = "Dashboard";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const globalStyles = appStyles();
    const ticker = useTicker();

    const {
        [getAccountBalanceStateNames.entity]: accountBalance,
        [getAccountBalanceStateNames.loaderIndicator]: accountBalanceLoading
    } = useSelector(state => state[ACCOUNT_BALANCE_STORE_NAME]);

    useEffect(() => {
        dispatch(setCurrentMenuItem(DASHBOARD_MENU_ITEM));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAccountBalance());
        dispatch(getLatestTransactions());
    }, [dispatch]);

    return (
        <>
            <Grid container
                  spacing={2}
                  direction="row"
                  justify="center"
                  alignItems="stretch">


                <Grid item xs={12} sm={6}>
                    <Paper className={globalStyles.paperSecondary} style={{height: `100%`, paddingBottom: 0}}>
                        <Grid container>
                            <Grid item xs={12} style={{paddingBottom: `20px`}}>
                                <Title>Account Balance</Title>
                            </Grid>

                            <Grid item xs={12}>
                                {
                                    accountBalanceLoading || !accountBalance ? <PageLoader/> :
                                        <>
                                            Available: {accountBalance.balance} {ticker}
                                        </>
                                }
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper className={globalStyles.paperSecondary} style={{height: `100%`, paddingBottom: 0}}>
                        <Grid container>
                            <Grid item xs={12} style={{paddingBottom: `20px`}}>
                                <Title>Recent Transactions</Title>
                            </Grid>

                            <Grid item xs={12}>
                                <TransactionList/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>
        </>
    );
}
