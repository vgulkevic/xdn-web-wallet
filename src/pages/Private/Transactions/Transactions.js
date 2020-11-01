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
import {mapFeedItem} from "../Dashboard/feedItem";
import DoneIcon from '@material-ui/icons/Done';

export const TRANSACTIONS_PATH = "/transactions";
export const TRANSACTIONS_MENU_ITEM = "Feed";


const headCells = [
    timeHeadCell('createdAt', 'Date', (el) => el.createdAt),
    {id: 'transactionAmount', label: 'Amount'},
    {id: 'address', label: 'Address'},
    {
        id: "type", label: "Type",
        custom: {
            element: (item) => {
                return <div title={item.type}>{getIcon(item)}</div>;
            }
        }
    },
    {
        id: "confirmed", label: "Confirmed",
        custom: {
            element: (item) => {
                if (item.type === 'debit') {
                    return <DoneIcon/>
                } else if (item.type === 'credit') {
                    if (item.confirmed) {
                        return <DoneIcon/>
                    } else {
                        return `${item.confirmations}/6`
                    }
                }
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
        [getAccountTransactionsStateNames.entity]: feedItems,
        [getAccountTransactionsStateNames.loaderIndicator]: accountTransactionsLoading
    } = useSelector(state => state[ACCOUNT_TRANSACTIONS_STORE_NAME]);

    useEffect(() => {
        dispatch(setCurrentMenuItem(TRANSACTIONS_MENU_ITEM));
    }, [dispatch]);

    useEffect(() => {
        // currently returns latest 30 feed items
        dispatch(getAccountTransactions());
    }, [dispatch]);

    return (
        <>
            <Paper className={classes.paper}>
                <BasicTableToolbar pageTitle="Transactions"/>
                <EnhancedTable headCells={headCells} tableElements={(feedItems || []).map(item => {return mapFeedItem(item)})} isLoading={accountTransactionsLoading} tableElementOnClick={(transaction) => {
                    setSelectedTransaction(transaction);
                    setTransactionDialogOpen(true);
                }}/>
            </Paper>
            <TransactionDialog open={transactionDialogOpen} setOpen={setTransactionDialogOpen} transaction={selectedTransaction}/>
        </>
    );
}
