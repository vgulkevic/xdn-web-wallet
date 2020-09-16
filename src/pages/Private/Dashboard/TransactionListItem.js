import React from "react";
import Grid from "@material-ui/core/Grid";
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {getFormattedTimestamp} from "../../../components/Table/headCells/timeHeadCell";
import {useTicker} from "../../../hooks/useTicker";
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import LoopIcon from '@material-ui/icons/Loop';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BlockIcon from '@material-ui/icons/Block';

export const TransactionListItem = ({transaction, onClick}) => {
    const ticker = useTicker();

    const getAmount = (transaction) => {
        if (transaction.category === "send") {
            return transaction.amount + transaction.fee
        }

        return transaction.amount
    }

    return (
        <>
            <ListItem onClick={() => onClick(transaction)} button>
                <ListItemAvatar>
                    <Avatar>
                        {getIcon(transaction)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                    <>
                        <Grid container direction="row" justify="space-between">
                            <Grid item>
                                {getFormattedTimestamp((transaction.timereceived || transaction.time) * 1000)}
                            </Grid>

                            <Grid item style={getAmountColor(transaction)}>
                                {getAmount(transaction)} {ticker}
                            </Grid>
                        </Grid>
                    </>}
                              secondary={transaction.address}/>
            </ListItem>
            <Divider variant="inset" component="li" style={{width: '100%', listStyle: 'none'}}/>
        </>
    );
}


export const getIcon = (transaction) => {
    switch (transaction.category) {
        case "receive":
            return <CallReceivedIcon/>
        case "send":
            return <CallMissedOutgoingIcon/>;
        case "move":
            return <ImportExportIcon/>;
        case "generate":
            return <LoopIcon/>
        case "orphan":
            return <BlockIcon/>
        case "immature":
            return <AccessTimeIcon/>
        default:
            return null;
    }
}

export const getAmountColor = (transaction) => {
    const color = {}

    switch (transaction.category) {
        case "receive":
        case "generate":
            // color.color = "#29a24a";
            return color;
        case "send":
            color.color = "#dc645b";
            return color;
        case "move":
        case "orphan":
        case "immature":
        default:
            return null;
    }
}

