import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";
import appStyles from "../../../assets/globalStyles";
import {ACCOUNT_TRANSACTIONS_STORE_NAME, getAccountTransactions, getAccountTransactionsStateNames} from "./redux/getTransactionsSlice";
import Paper from "@material-ui/core/Paper";
import {BasicTableToolbar} from "../../../components/Table/BasicTableToolbar";
import {EnhancedTable} from "../../../components/Table/Table";
import {timeHeadCell} from "../../../components/Table/headCells/timeHeadCell";
import {getIcon} from "../Dashboard/TransactionListItem";
import {TransactionDialog} from "./TransactionDialog";

export const TRANSACTIONS_PATH = "/transactions";
export const TRANSACTIONS_MENU_ITEM = "Transactions";


const headCells = [
    timeHeadCell('time', 'Date', (el) => parseInt(el.time) * 1000),
    {id: 'amount', label: 'Amount',
    custom: {
        element: (item) => {
            return item.amount
        }
    }},

    {id: 'address', label: 'Address'},
    {id: 'confirmations', label: 'Confirmations'},
    {
        id: "category", label: "",
        custom: {
            element: (item) => {
                return <div title={item.category}>{getIcon(item)}</div>;
            }
        }
    }
]

export const Transactions = () => {
    const classes = appStyles();
    const dispatch = useDispatch();
    const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const {
        [getAccountTransactionsStateNames.entity]: accountTransactions,
        [getAccountTransactionsStateNames.loaderIndicator]: accountTransactionsLoading
    } = useSelector(state => state[ACCOUNT_TRANSACTIONS_STORE_NAME]);

    useEffect(() => {
        dispatch(setCurrentMenuItem(TRANSACTIONS_MENU_ITEM));
    }, [dispatch]);

    useEffect(() => {
        // just gets 50 recent transactions
        dispatch(getAccountTransactions({count: 50, skip: 0}));
    }, [dispatch]);

    return (
        <>
            <Paper className={classes.paper}>
                <BasicTableToolbar pageTitle="Transactions"/>
                <EnhancedTable headCells={headCells} tableElements={accountTransactions || []} isLoading={accountTransactionsLoading} tableElementOnClick={(transaction) => {
                    setSelectedTransaction(transaction);
                    setTransactionDialogOpen(true);
                }}/>
            </Paper>
            <TransactionDialog open={transactionDialogOpen} setOpen={setTransactionDialogOpen} transaction={selectedTransaction}/>
        </>
    );
}
