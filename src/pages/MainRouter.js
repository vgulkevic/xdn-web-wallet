import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {MasternodeCalculator} from "./Public/MasternodeCalculator";
import {StakingCalculator} from "./Public/Staking/StakingCalculator";
import {LoginPage} from "./Login/LoginPage";
import {PrivateRoute} from "./Private/PrivateRoute";
import {Dashboard, DASHBOARD_PATH} from "./Private/Dashboard/Dashboard";
import {Receive, RECEIVE_PATH} from "./Private/Receive/Receive";
import {Send, SEND_PATH} from "./Private/Send/Send";
import {Transactions, TRANSACTIONS_PATH} from "./Private/Transactions/Transactions";
import {Masternodes, MASTERNODES_PATH} from "./Private/Masternodes/Masternodes";
import {Messages, MESSAGES_PATH} from "./Private/Messages/Messages";
import {Settings, SETTINGS_PATH} from "./Private/Settings/Settings";
import {PrivateRouteWrapper} from "./Private/PrivateRouteWrapper";
import LogInForm from "./Login/LogInForm";
import CompletePasswordForm from "./Login/CompletePasswordForm";
import ForgotPasswordForm from "./Login/ForgotPasswordForm";
import {ForgotPasswordConfirmForm} from "./Login/ForgotPasswordConfirmForm";
import SignUpForm from "./Login/SignUpForm";
import SignUpFormVerification from "./Login/SignUpFormVerification";

export const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/masternode-calculator" element={<MasternodeCalculator/>}/>
                <Route path="/staking-calculator" element={<StakingCalculator/>}/>

                <Route path="/auth" element={<LoginPage/>}>
                    <Route path="/" element={<LogInForm/>}/>
                    <Route path="/set-password" element={<CompletePasswordForm/>}/>
                    <Route path="/forgot" element={<ForgotPasswordForm/>}/>
                    <Route path="/forgot/complete" element={<ForgotPasswordConfirmForm/>}/>
                    <Route path="/sign-up" element={<SignUpForm/>}/>
                    <Route path="/sign-up/complete" element={<SignUpFormVerification/>}/>
                </Route>

                <PrivateRoute path="/" element={<PrivateRouteWrapper/>}>

                    <Route path="/" element={<Dashboard/>}/>
                    <Route path={DASHBOARD_PATH} element={<Dashboard/>}/>
                    <Route path={RECEIVE_PATH} element={<Receive/>}/>
                    <Route path={SEND_PATH} element={<Send/>}/>
                    <Route path={TRANSACTIONS_PATH} element={<Transactions/>}/>
                    {/*<Route path={ADDRESSES_PATH} render={(props) => <Addresses {...props} />}/>*/}
                    <Route path={MASTERNODES_PATH} element={<Masternodes/>}/>
                    <Route path={MESSAGES_PATH} element={<Messages/>}/>
                    {/*<Route path={BLOCK_EXPLORER_PATH} element={BlockExplorer}/> */}
                    <Route path={SETTINGS_PATH} element={<Settings/>}/>

                    <Route path="/*" element={<Navigate to={DASHBOARD_PATH}/>}/>
                </PrivateRoute>

                <Route path="/*" element={<Navigate to={"/auth"}/>}/>
            </Routes>
        </BrowserRouter>
    );
}
