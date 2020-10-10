import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import {useAsync} from "../../hooks/useAsync";

const useStyles = makeStyles((theme) => ({
    container: {
        opacity: 0,
        visibility: 'hidden',
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

export const FadeInContainer = ({children}) => {
    const classes = useStyles();

    const [initialised, setInitialised] = useState(false);

    useAsync(() => new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 100)
    }), setInitialised);

    return (
        <Grid item className={clsx(classes.container, initialised && classes.fadeIn)}>
            {children}
        </Grid>
    );
}
