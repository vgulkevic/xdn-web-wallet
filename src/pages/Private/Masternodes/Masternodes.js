import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";

export const MASTERNODES_PATH = "/masternodes";
export const MASTERNODES_MENU_ITEM = "Masternodes";

export const Masternodes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentMenuItem(MASTERNODES_MENU_ITEM));
    }, [dispatch]);

    return (
        <>
            Masternodes content
        </>
    );
}
