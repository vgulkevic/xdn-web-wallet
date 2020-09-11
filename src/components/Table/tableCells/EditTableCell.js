import React from "react";
import {IconButton, TableCell} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

export const EditTableCell = ({el, item}) => {
    return (
        <TableCell>
            <IconButton color="default"
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            el.onClickCallback(item)
                        }}>
                <CreateIcon/>
            </IconButton>
        </TableCell>
    );
}
