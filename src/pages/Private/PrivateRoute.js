import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {PageLoader} from "../../components/PageLoader";
import {AUTH_STORE_NAME, getAuthStateNames} from "../Login/redux/loginSlice";

export const PrivateRoute = ({element, path, children}) => {

    const {
        [getAuthStateNames.entity]: user,
        [getAuthStateNames.loading]: loadingUser
    } = useSelector(state => state[AUTH_STORE_NAME])

    return (
        <>
            {
                loadingUser ? <PageLoader/> :
                    user ?
                        <Route path={path} element={element}>{children}</Route> :
                        <Navigate to={"/auth"} replace={true}/>
            }
        </>
    )
}
