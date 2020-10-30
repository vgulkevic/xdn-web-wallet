import React, {useEffect} from "react";
import appStyles from "../../assets/globalStyles";
import Container from "@material-ui/core/Container";
import {drawerWidth, SidebarMenu} from "../../components/SidebarMenu/SidebarMenu";
import {useSelector} from "react-redux";
import {NAVIGATION_MENU_STORE_NAME} from "../../components/SidebarMenu/redux/navigationMenuSlice";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import {disconnectSocket, initiateSocket, subscribeToUpdates} from "../../socket/socket";
import {useDispatch} from "react-redux";
import {Outlet} from 'react-router-dom';
import {AUTH_STORE_NAME, getAuthStateNames, incompleteUserStateName, signInStateNames} from "../Login/redux/loginSlice";

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

export const PrivateRouteWrapper = () => {
    const styles = appStyles();
    const localStyles = useStyles();
    const dispatch = useDispatch();

    const {sidebarOpen, initialised} = useSelector(state => state[NAVIGATION_MENU_STORE_NAME]);

    const {
        [getAuthStateNames.entity]: loggedInUser,
    } = useSelector(state => state[AUTH_STORE_NAME])


    // todo fix socket init
    // useEffect(() => {
    //     initiateSocket(user.token);
    //     subscribeToUpdates(dispatch);
    //     return () => {
    //         disconnectSocket()
    //     };
    // }, [user.token, dispatch])

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
                                    <Outlet/>
                                </div>
                            </Container>
                        </main>
                        : null
                }
            </div>
        </>
    );
}
