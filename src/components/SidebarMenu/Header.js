import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {drawerWidth} from "./SidebarMenu";
import {useSelector} from "react-redux";
import {NAVIGATION_MENU_STORE_NAME} from "./redux/navigationMenuSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
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

export const Header = ({handleDrawerOpen, isDrawerOpen}) => {
    const classes = useStyles();
    const {currentMenuItem} = useSelector(state => state[NAVIGATION_MENU_STORE_NAME]);

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: isDrawerOpen,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => handleDrawerOpen(true)}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: isDrawerOpen,
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
