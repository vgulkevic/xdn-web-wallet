import React from "react";
import {PageLoader} from "../../../components/PageLoader";
import {getLatestTransactionsStateNames, LATEST_TRANSACTIONS_STORE_NAME} from "./redux/latestTransactionsSlice";
import {useSelector} from "react-redux";
import {TransactionListItem} from "./TransactionListItem";
import Grid from "@material-ui/core/Grid";

export const TransactionList = () => {
    const {
        [getLatestTransactionsStateNames.entity]: latestTransactions,
        [getLatestTransactionsStateNames.loaderIndicator]: latestTransactionsLoading
    } = useSelector(state => state[LATEST_TRANSACTIONS_STORE_NAME]);

    return (
        <>
            {
                latestTransactionsLoading || !latestTransactions ? <PageLoader/> :
                    <>
                        <Grid container style={{overflow: "hidden"}}>
                            {
                                latestTransactions
                                    .sort(function (a, b) {
                                        return b.time - a.time;
                                    })
                                    .map((transaction, index) => {
                                        return <TransactionListItem key={index} transaction={transaction}/>
                                    })
                            }
                        </Grid>
                    </>
            }
        </>
    );
}
