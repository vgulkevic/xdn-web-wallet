import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";
import {ADDRESSES_STORE_NAME, getAddresses, getAddressesStateNames} from "./redux/addressesSlice";
import Paper from "@material-ui/core/Paper";
import appStyles from "../../../assets/globalStyles";
import {BasicTableToolbar} from "../../../components/Table/BasicTableToolbar";
import {EnhancedTable} from "../../../components/Table/Table";

export const ADDRESSES_PATH = "/addresses";
export const ADDRESSES_MENU_ITEM = "Addresses";

const headCells = [
    {id: 'country', label: 'Label'},
    {id: 'address', label: 'Address'}
]

export const Addresses = () => {
    const classes = appStyles();
    const dispatch = useDispatch();

    const {
        [getAddressesStateNames.entity]: addresses,
        [getAddressesStateNames.loaderIndicator]: addressesLoading
    } = useSelector(state => state[ADDRESSES_STORE_NAME]);

    useEffect(() => {
        dispatch(setCurrentMenuItem(ADDRESSES_MENU_ITEM));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);

    return (
        <>
            <Paper className={classes.paper}>
                <BasicTableToolbar pageTitle="Addresses"/>
                <EnhancedTable headCells={headCells} tableElements={addresses || []} isLoading={addressesLoading}/>
            </Paper>
        </>
    );
}
