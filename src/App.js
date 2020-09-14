import React, {useEffect} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import appStyles from "./assets/globalStyles";
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "./theme";
import {SnackbarProvider} from "notistack";
import Notifier from "./components/Notifier/Notifier";
import {LoginPage} from "./pages/Login/LoginPage";
import {AuthenticatedRoute} from "./pages/Private/AuthenticatedRoute";
import {useDispatch, useSelector} from "react-redux";
import {authenticateUser, authenticateUserStateNames, USER_SESSION_STORE_NAME} from "./redux/userSessionSlice";
import CssBaseline from "@material-ui/core/CssBaseline";
import {AppLoadError} from "./components/AppLoadError";
import {PageLoader} from "./components/PageLoader";

export const App = () => {
    const dispatch = useDispatch();
    const styles = appStyles();

    const {
        [authenticateUserStateNames.entity]: user,
        [authenticateUserStateNames.loading]: checkingToken,
        [authenticateUserStateNames.error]: authError
    } = useSelector(state => state[USER_SESSION_STORE_NAME]);

    useEffect(() => {
        dispatch(authenticateUser());
    }, [dispatch]);

    const getView = (props) => {
        if (authError) {
            // something went wrong
            return <AppLoadError/>
        }

        if (checkingToken) {
            // loading
            return <PageLoader/>
        }

        if (user && user.token) {
            return <AuthenticatedRoute {...props}/>
        } else {
            return <LoginPage {...props} />
        }
    }

    return (
        <MuiThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={5}
                              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                              classes={{variantSuccess: styles.success, variantError: styles.error}}>
                <Notifier/>

                <CssBaseline/>
                <BrowserRouter>
                    <Route path="/" render={(props) => getView(props)}/>
                </BrowserRouter>

            </SnackbarProvider>
        </MuiThemeProvider>
    );
}
