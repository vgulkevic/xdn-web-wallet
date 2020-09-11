import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {drawerWidth} from "./SidebarMenu";
import {useDispatch, useSelector} from "react-redux";
import {NAVIGATION_MENU_STORE_NAME, setSidebarOpen} from "./redux/navigationMenuSlice";

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
}));

export const Header = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {sidebarOpen, currentMenuItem} = useSelector(state => state[NAVIGATION_MENU_STORE_NAME]);

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: sidebarOpen,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => {
                        dispatch(setSidebarOpen(true));
                    }}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: sidebarOpen,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {currentMenuItem}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
