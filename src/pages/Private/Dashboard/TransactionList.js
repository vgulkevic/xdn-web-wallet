import React, {useState} from "react";
import {PageLoader} from "../../../components/PageLoader";
import {getLatestTransactionsStateNames, LATEST_TRANSACTIONS_STORE_NAME} from "./redux/latestTransactionsSlice";
import {useSelector} from "react-redux";
import {TransactionListItem} from "./TransactionListItem";
import Grid from "@material-ui/core/Grid";
import {TransactionDialog} from "../Transactions/TransactionDialog";

export const TransactionList = () => {
    const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

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
                                latestTransactions.slice()
                                    .sort(function (a, b) {
                                        return b.time - a.time;
                                    })
                                    .map((transaction, index) => {
                                        return <TransactionListItem key={index} transaction={transaction} onClick={(tr) => {
                                            setSelectedTransaction(tr)
                                            setTransactionDialogOpen(true);
                                        }}/>
                                    })
                            }
                        </Grid>
                        <TransactionDialog open={transactionDialogOpen} setOpen={setTransactionDialogOpen} transaction={selectedTransaction}/>
                    </>
            }
        </>
    );
}
