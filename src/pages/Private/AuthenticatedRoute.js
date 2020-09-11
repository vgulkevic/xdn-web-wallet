import React, {useState} from "react";
import {PageLoader} from "../../components/PageLoader";
import {MainAuthenticatedRoute} from "./MainAuthenticatedRoute";

export const AuthenticatedRoute = ({...props}) => {
    const [appLoading, setAppLoading] = useState(false);

    return (
        <>
            {
                appLoading ?
                    <PageLoader/>
                    :
                    <MainAuthenticatedRoute/>
            }
        </>
    );
}
