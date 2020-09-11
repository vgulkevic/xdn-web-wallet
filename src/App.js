import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import appStyles from "./assets/globalStyles";
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "./theme";
import {SnackbarProvider} from "notistack";
import Notifier from "./components/Notifier/Notifier";
import {LoginPage} from "./pages/Login/LoginPage";
import {AuthenticatedRoute} from "./pages/Private/AuthenticatedRoute";
import {useUser} from "./hooks/useUser";

export const App = () => {
    const styles = appStyles();
    const user = useUser();

    return (
        <MuiThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={5}
                              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                              classes={{variantSuccess: styles.success, variantError: styles.error}}>
                <Notifier/>

                <BrowserRouter>
                    {/*css baseline, header, menu and are inside AuthenticatedRoute so depending on the layout requirements of loginPage it might be wise to move auth check inside MainRoute*/}
                    <Route path="/" render={(props) => !user ? <LoginPage {...props} /> : <AuthenticatedRoute {...props} />}/>
                </BrowserRouter>

            </SnackbarProvider>
        </MuiThemeProvider>
    );
}
