import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";

export const RECEIVE_PATH = "/receive";
export const RECEIVE_MENU_ITEM = "Receive";

export const Receive = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentMenuItem(RECEIVE_MENU_ITEM));
    }, [dispatch]);

    return (
        <>
            Receive content
        </>
    );
}
