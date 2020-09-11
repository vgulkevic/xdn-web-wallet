import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";

export const SEND_PATH = "/send";
export const SEND_MENU_ITEM = "Send";

export const Send = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentMenuItem(SEND_MENU_ITEM));
    }, [dispatch]);

    return (
        <>
            Send content
        </>
    );
}
