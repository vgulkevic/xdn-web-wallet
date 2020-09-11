import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";

export const TRANSACTIONS_PATH = "/transactions";
export const TRANSACTIONS_MENU_ITEM = "Transactions";

export const Transactions = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentMenuItem(TRANSACTIONS_MENU_ITEM));
    }, [dispatch]);

    return (
        <>
            Transactions content
        </>
    );
}
