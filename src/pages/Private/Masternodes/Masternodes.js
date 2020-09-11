import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";
import appStyles from "../../../assets/globalStyles";
import Paper from "@material-ui/core/Paper";
import {BasicTableToolbar} from "../../../components/Table/BasicTableToolbar";
import {EnhancedTable} from "../../../components/Table/Table";
import {getMasternodes, getMasternodesStateNames, MASTERNODES_STORE_NAME} from "./redux/masternodesSlice";
import Checkbox from "@material-ui/core/Checkbox";
import {intComparator, secondsToDhms} from "../../../utils/timeUtils";
import {timeHeadCell} from "../../../components/Table/headCells/timeHeadCell";

export const MASTERNODES_PATH = "/masternodes";
export const MASTERNODES_MENU_ITEM = "Masternodes";

const headCells = [
    {id: 'ip', label: 'IP Address'},
    {
        id: 'status', label: 'Active',
        custom: {
            element: item => (<Checkbox disabled checked={item.status === 'ENABLED'} inputProps={{ 'aria-label': 'disabled checkbox' }} />)
        }
    },
    {id: 'address', label: 'Address'},
    {id: 'protocol', label: 'Protocol'},
    {
        id: "activeseconds", label: 'Active (secs)',
        valueGetter: (model) => {
            return secondsToDhms(model.activeseconds);
        },
        comparator: (a, b) => {
            return intComparator(parseInt(a.activeseconds), parseInt(b.activeseconds))
        }
    },
    // multiply by 1000 to get millis
    timeHeadCell('lastseen', 'Last seen', (el) => parseInt(el.lastseen) * 1000)
]

export const Masternodes = () => {
    const classes = appStyles();
    const dispatch = useDispatch();

    const {
        [getMasternodesStateNames.entity]: masternodes,
        [getMasternodesStateNames.loaderIndicator]: masternodesLoading
    } = useSelector(state => state[MASTERNODES_STORE_NAME]);

    useEffect(() => {
        dispatch(setCurrentMenuItem(MASTERNODES_MENU_ITEM));
    }, [dispatch]);


    useEffect(() => {
        dispatch(getMasternodes());
    }, [dispatch]);

    return (
        <>
            <Paper className={classes.paper}>
                <BasicTableToolbar pageTitle="Masternodes"/>
                <EnhancedTable headCells={headCells} tableElements={masternodes || []} isLoading={masternodesLoading}/>
            </Paper>
        </>
    );
}
