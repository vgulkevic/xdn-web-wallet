import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ContactsIcon from '@material-ui/icons/Contacts';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import MessageIcon from '@material-ui/icons/Message';
import ExploreIcon from '@material-ui/icons/Explore';
import {Header} from "./Header";
import CardMedia from "@material-ui/core/CardMedia";
import Logo from "../../assets/img/DigitalNoteLogoText.png"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import {MenuItem} from "./MenuItem";
import {useSelector} from "react-redux";
import {NAVIGATION_MENU_STORE_NAME} from "./redux/navigationMenuSlice";
import {DASHBOARD_MENU_ITEM, DASHBOARD_PATH} from "../../pages/Private/Dashboard/Dashboard";
import {RECEIVE_MENU_ITEM, RECEIVE_PATH} from "../../pages/Private/Receive/Receive";
import {SEND_MENU_ITEM, SEND_PATH} from "../../pages/Private/Send/Send";
import {TRANSACTIONS_MENU_ITEM, TRANSACTIONS_PATH} from "../../pages/Private/Transactions/Transactions";
import {ADDRESSES_MENU_ITEM, ADDRESSES_PATH} from "../../pages/Private/Addresses/Addresses";
import {MASTERNODES_MENU_ITEM, MASTERNODES_PATH} from "../../pages/Private/Masternodes/Masternodes";
import {MESSAGES_MENU_ITEM, MESSAGES_PATH} from "../../pages/Private/Messages/Messages";
import {BLOCK_EXPLORER_MENU_ITEM, BLOCK_EXPLORER_PATH} from "../../pages/Private/BlockExplorer/BlockExplorer";

export const drawerWidth = 240;

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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    media: {
        width: '150px',
        height: 'auto',
        marginLeft: theme.spacing(1)
    },
}));

export const SidebarMenu = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const iconColor = "secondary";

    const {currentMenuItem} = useSelector(state => state[NAVIGATION_MENU_STORE_NAME]);

    const isSelected = (menuItemId) => {
        return menuItemId === currentMenuItem;
    }

    return (
        <>
            <Header isDrawerOpen={open} handleDrawerOpen={setOpen}/>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <div style={{width: '100%'}}>
                        <CardMedia className={classes.media} component="img" src={Logo}/>
                    </div>
                    <IconButton onClick={()=>setOpen(false)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>


                <Divider/>
                <List>
                    <MenuItem text={'Dashboard'} icon={<HomeIcon color={iconColor}/>} selected={isSelected(DASHBOARD_MENU_ITEM)} path={DASHBOARD_PATH}/>
                    <MenuItem text={'Receive'} icon={<CallReceivedIcon color={iconColor}/>} selected={isSelected(RECEIVE_MENU_ITEM)} path={RECEIVE_PATH}/>
                    <MenuItem text={'Send'} icon={<CallMissedOutgoingIcon color={iconColor}/>} selected={isSelected(SEND_MENU_ITEM)} path={SEND_PATH}/>
                    <MenuItem text={'Transactions'} icon={<AccountBalanceWalletIcon color={iconColor}/>} selected={isSelected(TRANSACTIONS_MENU_ITEM)} path={TRANSACTIONS_PATH}/>
                    <MenuItem text={'Addresses'} icon={<ContactsIcon color={iconColor}/>} selected={isSelected(ADDRESSES_MENU_ITEM)} path={ADDRESSES_PATH}/>
                    <MenuItem text={'Masternodes'} icon={<SettingsInputAntennaIcon color={iconColor}/>} selected={isSelected(MASTERNODES_MENU_ITEM)} path={MASTERNODES_PATH}/>
                    <MenuItem text={'Messages'} icon={<MessageIcon color={iconColor}/>} selected={isSelected(MESSAGES_MENU_ITEM)} path={MESSAGES_PATH}/>
                    <MenuItem text={'Block Explorer'} icon={<ExploreIcon color={iconColor}/>} selected={isSelected(BLOCK_EXPLORER_MENU_ITEM)} path={BLOCK_EXPLORER_PATH}/>
                </List>
                <Divider/>

                <List style={{paddingTop: '50px'}}>
                    <ListItem button>
                        <ListItemIcon><SettingsIcon color={iconColor}/></ListItemIcon>
                        <ListItemText primary={'Settings'}/>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon><ExitToAppIcon color={iconColor}/></ListItemIcon>
                        <ListItemText primary={'Logout'}/>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}