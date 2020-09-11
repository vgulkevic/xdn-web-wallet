import Title from "../Title";
import {Toolbar} from "@material-ui/core";
import React from "react";
import globalStyles from "../../assets/globalStyles";

export function BasicTableToolbar({pageTitle, children}) {
    const classes = globalStyles();

    return (
        <Toolbar className={classes.tableToolbar}>
            <Title style={{marginRight: 30}}>{pageTitle}</Title>
            <div style={{flex: 1}}/>
            {children}
        </Toolbar>
    )
}
