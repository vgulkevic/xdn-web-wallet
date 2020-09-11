import makeStyles from "@material-ui/core/styles/makeStyles";

const appStyles = makeStyles(theme => ({
    rootDiv: {
        flexGrow: 1,
        display: "flex",
        height: "100%",
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: theme.palette.background.default,
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
    },
    appBarSpacer: {
        paddingTop: '80px'
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