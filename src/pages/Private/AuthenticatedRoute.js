import React from "react";
import appStyles from "../../assets/globalStyles";
import Container from "@material-ui/core/Container";
import {Redirect, Route} from "react-router-dom";
import {Dashboard, DASHBOARD_PATH} from "./Dashboard/Dashboard";
import {drawerWidth, SidebarMenu} from "../../components/SidebarMenu/SidebarMenu";
import {Receive, RECEIVE_PATH} from "./Receive/Receive";
import {Send, SEND_PATH} from "./Send/Send";
import {Transactions, TRANSACTIONS_PATH} from "./Transactions/Transactions";
import {Addresses, ADDRESSES_PATH} from "./Addresses/Addresses";
import {Masternodes, MASTERNODES_PATH} from "./Masternodes/Masternodes";
import {Messages, MESSAGES_PATH} from "./Messages/Messages";
import {BLOCK_EXPLORER_PATH, BlockExplorer} from "./BlockExplorer/BlockExplorer";
import {useSelector} from "react-redux";
import {NAVIGATION_MENU_STORE_NAME} from "../../components/SidebarMenu/redux/navigationMenuSlice";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import {Settings, SETTINGS_PATH} from "./Settings/Settings";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export const AuthenticatedRoute = () => {
    const styles = appStyles();
    const localStyles = useStyles();

    const {sidebarOpen, initialised} = useSelector(state => state[NAVIGATION_MENU_STORE_NAME]);

    return (
        <>

            <div className={styles.rootDiv}>
                <SidebarMenu/>

                {
                    initialised ?

                        <main className={clsx(styles.content,
                            {
                                [localStyles.contentShift]: sidebarOpen
                            })}
                        >
                            <div className={styles.appBarSpacer}/>

                            <Container maxWidth="xl" className={styles.container}>
                                <div style={{width: '100%'}}>
                                    <Route exact path="/" render={() => <Redirect to={DASHBOARD_PATH}/>}/>

                                    <Route exact path={DASHBOARD_PATH} render={(props) => <Dashboard {...props} />}/>
                                    <Route exact path={RECEIVE_PATH} render={(props) => <Receive {...props} />}/>
                                    <Route exact path={SEND_PATH} render={(props) => <Send {...props} />}/>
                                    <Route exact path={TRANSACTIONS_PATH} render={(props) => <Transactions {...props} />}/>
                                    {/*<Route exact path={ADDRESSES_PATH} render={(props) => <Addresses {...props} />}/>*/}
                                    <Route exact path={MASTERNODES_PATH} render={(props) => <Masternodes {...props} />}/>
                                    {/*<Route exact path={MESSAGES_PATH} render={(props) => <Messages {...props} />}/>*/}
                                    {/*<Route exact path={BLOCK_EXPLORER_PATH} render={(props) => <BlockExplorer {...props} />}/>*/}
                                    <Route exact path={SETTINGS_PATH} render={(props) => <Settings {...props} />}/>

                                    <Redirect to={DASHBOARD_PATH} />
                                </div>
                            </Container>
                        </main>
                        : null
                }
            </div>
        </>
    );
}
