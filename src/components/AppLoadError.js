import React from "react";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import Title from "./Title";
import {makeStyles} from "@material-ui/core/styles";


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


export const AppLoadError = () => {
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
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <Title>Sorry, something went wrong</Title>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
