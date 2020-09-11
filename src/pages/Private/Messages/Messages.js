import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";

export const MESSAGES_PATH = "/messages";
export const MESSAGES_MENU_ITEM = "Messages";

export const Messages = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentMenuItem(MESSAGES_MENU_ITEM));
    }, [dispatch]);


    return (
        <>
            Messages content
        </>
    );
}
