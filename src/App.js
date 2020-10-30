import React, {useEffect} from 'react';
import appStyles from "./assets/globalStyles";
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "./theme";
import {SnackbarProvider} from "notistack";
import Notifier from "./components/Notifier/Notifier";
import {useDispatch} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import {MainRouter} from "./pages/MainRouter";
import Amplify, {Hub} from '@aws-amplify/core'
import {profile} from "./profile";
import {getAuth, resetState} from "./pages/Login/redux/loginSlice";

Amplify.configure({
    Auth: {
        region: profile.AWS_REGION,
        userPoolId: profile.USER_POOL_ID,
        userPoolWebClientId: profile.USER_POOL_CLIENT_ID,
    }
});

export const App = () => {
    const dispatch = useDispatch();
    const styles = appStyles();

    useEffect(() => {
        const listener = data => {
            switch (data.payload.event) {
                case "signIn":
                    dispatch(getAuth());
                    break;
                case "signOut":
                    dispatch(resetState());
                    break;
                default:
                    return;
            }
        };

        dispatch(getAuth());
        Hub.listen("auth", listener);
    }, [dispatch]);

    return (
        <MuiThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={5}
                              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                              classes={{variantSuccess: styles.success, variantError: styles.error}}>
                <Notifier/>
                <CssBaseline/>
                <MainRouter/>
            </SnackbarProvider>
        </MuiThemeProvider>
    );
}
