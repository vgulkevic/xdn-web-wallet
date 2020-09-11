import React from "react";
import appStyles from "../../assets/globalStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {Redirect, Route} from "react-router-dom";
import {Dashboard, DASHBOARD_PATH} from "./Dashboard/Dashboard";
import {SidebarMenu} from "../../components/SidebarMenu/SidebarMenu";
import {Receive, RECEIVE_PATH} from "./Receive/Receive";
import {Send, SEND_PATH} from "./Send/Send";
import {Transactions, TRANSACTIONS_PATH} from "./Transactions/Transactions";
import {Addresses, ADDRESSES_PATH} from "./Addresses/Addresses";
import {Masternodes, MASTERNODES_PATH} from "./Masternodes/Masternodes";
import {Messages, MESSAGES_PATH} from "./Messages/Messages";
import {BLOCK_EXPLORER_PATH, BlockExplorer} from "./BlockExplorer/BlockExplorer";

export const MainAuthenticatedRoute = () => {
    const styles = appStyles();

    return (
        <div className={styles.rootDiv}>
            <CssBaseline/>
            <SidebarMenu/>

            <main className={styles.content}>
                <Container maxWidth="xl" className={styles.container}>
                    <div className={styles.appBarSpacer}/>
                    <Route exact path="/" render={() => <Redirect to={DASHBOARD_PATH}/>}/>

                    <Route exact path={DASHBOARD_PATH} render={(props) => <Dashboard {...props} />}/>
                    <Route exact path={RECEIVE_PATH} render={(props) => <Receive {...props} />}/>
                    <Route exact path={SEND_PATH} render={(props) => <Send {...props} />}/>
                    <Route exact path={TRANSACTIONS_PATH} render={(props) => <Transactions {...props} />}/>
                    <Route exact path={ADDRESSES_PATH} render={(props) => <Addresses {...props} />}/>
                    <Route exact path={MASTERNODES_PATH} render={(props) => <Masternodes {...props} />}/>
                    <Route exact path={MESSAGES_PATH} render={(props) => <Messages {...props} />}/>
                    <Route exact path={BLOCK_EXPLORER_PATH} render={(props) => <BlockExplorer {...props} />}/>
                </Container>
            </main>
        </div>
    );
}
