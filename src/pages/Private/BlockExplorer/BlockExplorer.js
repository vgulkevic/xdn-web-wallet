import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";

export const BLOCK_EXPLORER_PATH = "/block-explorer";
export const BLOCK_EXPLORER_MENU_ITEM = "Block Explorer"

export const BlockExplorer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentMenuItem(BLOCK_EXPLORER_MENU_ITEM));
    }, [dispatch]);

    return (
        <>
            BlockExplorer content
        </>
    );
}
