import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {useNavigate} from "react-router-dom";

export const MenuItem = ({text, icon, selected, path}) => {
    const navigate = useNavigate();

    return (
        <>
            <ListItem button selected={selected} onClick={() => {
                navigate(path);
            }}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text}/>
            </ListItem>
        </>
    );
}
