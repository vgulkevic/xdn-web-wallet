import Loader from "react-loader-spinner";
import React from "react";

export const PageLoader = () => {
    return (
        <div style={{textAlign: 'center', marginTop: '50px', width: '100%'}}>
            <Loader className="loader" type="Oval" color="#00BFFF" height="50" width="50"/>
        </div>
    )
}