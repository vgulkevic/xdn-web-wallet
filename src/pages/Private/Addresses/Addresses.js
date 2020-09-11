import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";

export const ADDRESSES_PATH = "/addresses";
export const ADDRESSES_MENU_ITEM = "Addresses";

export const Addresses = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentMenuItem(ADDRESSES_MENU_ITEM));
    }, [dispatch]);

    return (
        <>
            Addresses content
        </>
    );
}
