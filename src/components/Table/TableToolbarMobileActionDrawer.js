import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Drawer from "@material-ui/core/Drawer";
import {Hidden} from "@material-ui/core";
import CustomButton from "../CustomButton";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    drawer: {
        padding: theme.spacing(2),
        width: 'auto',
    }
}));

export const TableToolbarMobileActionDrawer = ({children}) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open)
    };

    return (
        <>
            <Hidden mdUp>
                <CustomButton variant="outlined"
                              color="primary"
                              onClick={() => setIsOpen(true)}
                              endIcon={<ExpandMoreIcon/>}>
                    Actions
                </CustomButton>

                <Drawer anchor={"top"} open={isOpen} onClose={toggleDrawer(false)}>
                    <div
                        className={classes.drawer}
                        role="presentation"
                    >
                        <List>
                            <Grid container spacing={2}>
                                {children.map((ch, index) => {
                                    return (
                                        <Grid item key={index} style={{width: '100%'}}>
                                            {ch}
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </List>
                    </div>
                </Drawer>
            </Hidden>
            <Hidden smDown>
                {children}
            </Hidden>
        </>
    );
}