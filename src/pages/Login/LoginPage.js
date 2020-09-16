import React, {useState} from "react";
import {Box} from "@material-ui/core";
import './loginPage.css'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {useAsync} from "../../hooks/useAsync";
import {Redirect, Route, Switch} from "react-router-dom";
import {LoginSetup} from "./LoginSetup";
import {NewAddress} from "./NewAddress";
import {ImportAddress} from "./ImportAddress";
import {LogoComponent} from "./LogoComponent";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '100px',
        paddingBottom: '100px'
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
        },
        opacity: 0,
        visibility: 'hidden',
    },
    formPaper: {
        padding: theme.spacing(8),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    fadeOut: {
        opacity: 0,
        visibility: 'hidden',
        transition: 'visibility 0.5s, opacity 0.5s'
    },
    fadeIn: {
        opacity: 1,
        visibility: 'visible',
        transition: 'visibility 0.5s, opacity 0.5s'
    }
}));

export const LoginPage = ({...props}) => {
    const classes = useStyles();
    const [initialised, setInitialised] = useState(false);

    useAsync(() => new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 100)
    }), setInitialised);

    return (
        <Box>
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className={classes.root}
            >
                <Grid item className={clsx(classes.formContainer, initialised && classes.fadeIn)}>
                    <Paper elevation={16} className={classes.formPaper}>
                        <Grid item>
                            <Grid container>
                                <LogoComponent/>

                                <Switch>
                                    <Route path="/set-up" render={() => <LoginSetup/>}/>
                                    <Route exact path="/new-address" render={() => <NewAddress/>}/>
                                    <Route exact path="/import-address" render={() => <ImportAddress/>}/>

                                    <Redirect to='/set-up'/>
                                </Switch>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
