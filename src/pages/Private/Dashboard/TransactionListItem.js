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

export const TransactionListItem = ({feedItem, onClick}) => {
    const ticker = useTicker();

    return (
        <>
            <ListItem onClick={() => onClick(feedItem)} button>
                <ListItemAvatar>
                    <Avatar>
                        {getIcon(feedItem)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                    <>
                        <Grid container direction="row" justify="space-between">
                            <Grid item>
                                {getFormattedTimestamp(feedItem.createdAt)}
                            </Grid>

                            <Grid item style={getAmountColor(feedItem)}>
                                {feedItem.transactionAmount} {ticker}
                            </Grid>
                        </Grid>
                    </>}
                              secondary={feedItem.address}/>
            </ListItem>
            <Divider variant="inset" component="li" style={{width: '100%', listStyle: 'none'}}/>
        </>
    );
}


export const getIcon = (feedItem) => {
    switch (feedItem.type) {
        case "credit":
            return <CallReceivedIcon/>
        case "debit":
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

export const getAmountColor = (feedItem) => {
    const color = {}

    switch (feedItem.type) {
        case "credit":
        case "generate":
            // color.color = "#29a24a";
            return color;
        case "debit":
            color.color = "#dc645b";
            return color;
        case "move":
        case "orphan":
        case "immature":
        default:
            return null;
    }
}

