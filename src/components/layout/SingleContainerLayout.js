import React from "react";
import {Box} from "@material-ui/core";
import './singleContainerLayout.css'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {LogoComponent} from "../../pages/Login/LogoComponent";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    formContainer: {
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(2),
            width: '60%'
        },
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2),
            width: '70%'
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            width: '90%'
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2),
            width: '100%'
        }
    },
    formPaper: {
        padding: theme.spacing(8),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    }
}));

export const SingleContainerLayout = ({children, ...props}) => {
    const classes = useStyles();


    return (
        <Box>
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className={classes.root}
            >
                <Grid item className={clsx(classes.formContainer)}>
                    <Paper elevation={16} className={classes.formPaper}>
                        <Grid item>
                            <Grid container>
                                <LogoComponent/>

                                {children}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
