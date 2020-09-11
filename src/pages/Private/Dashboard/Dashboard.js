import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentMenuItem} from "../../../components/SidebarMenu/redux/navigationMenuSlice";

export const DASHBOARD_PATH = "/dashboard";
export const DASHBOARD_MENU_ITEM = "Dashboard";

export const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentMenuItem(DASHBOARD_MENU_ITEM));
    }, [dispatch]);

    return (
        <>
            Dashboard content
        </>
    );
}
