import makeStyles from "@material-ui/core/styles/makeStyles";
import {drawerWidth} from "../components/SidebarMenu/SidebarMenu";

const appStyles = makeStyles(theme => ({
    rootDiv: {
        display: "flex",
        height: "100%"
    },
    content: {
        flexGrow: 1,
        width: '100%',
        height: '100vh',
        overflow: 'auto',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(0),
            paddingRight: theme.spacing(0),
        },
    },
    container: {
        paddingTop: 0,
        paddingBottom: theme.spacing(4),
        minHeight: `calc(100% - ${theme.spacing(9)}px)`,
        display: "flex",
        alignItems: "stretch",
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        marginBottom: '50px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    appBarSpacer: {
        paddingTop: '80px'
    },

    paperSecondary: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(3, 5),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        }
    },

    //notifications
    success: {
        borderRadius: 0,
    },
    error: {
        borderRadius: 0,
    },
}));

export default appStyles;