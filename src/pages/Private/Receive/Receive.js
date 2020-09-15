import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";
import appStyles from "../../../assets/globalStyles";
import {ACCOUNT_ADDRESSES_STORE_NAME, createAccountAddress, createAccountAddressStateNames, getAccountAddresses, getAccountAddressesStateNames} from "./redux/accountAddressesSlice";
import Paper from "@material-ui/core/Paper";
import {BasicTableToolbar} from "../../../components/Table/BasicTableToolbar";
import {EnhancedTable} from "../../../components/Table/Table";
import {CreateNewButton} from "../../../components/buttons";
import { v4 as uuidv4 } from 'uuid';

export const RECEIVE_PATH = "/receive";
export const RECEIVE_MENU_ITEM = "Receive";

const headCells = [
    {id: 'address', label: 'Address', valueGetter: (el) => el}
]

export const Receive = () => {
    const [id, setId] = useState();
    const classes = appStyles();
    const dispatch = useDispatch();

    const {
        [getAccountAddressesStateNames.entity]: accountAddresses,
        [getAccountAddressesStateNames.loaderIndicator]: accountAddressesLoading,

        [createAccountAddressStateNames.loaderIndicator]: creatingNewAddress
    } = useSelector(state => state[ACCOUNT_ADDRESSES_STORE_NAME]);

    useEffect(() => {
        dispatch(setCurrentMenuItem(RECEIVE_MENU_ITEM));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAccountAddresses());
    }, [dispatch])

    return (
        <>
            <Paper className={classes.paper}>
                <BasicTableToolbar pageTitle="Your addresses">
                    <CreateNewButton
                        onClick={() => {
                            setId(uuidv4());
                            dispatch(createAccountAddress({id: id, body: {}}));
                        }}
                        loading={creatingNewAddress[id]}
                    />
                </BasicTableToolbar>
                <EnhancedTable headCells={headCells} tableElements={accountAddresses || []} isLoading={accountAddressesLoading}/>
            </Paper>
        </>
    );
}
