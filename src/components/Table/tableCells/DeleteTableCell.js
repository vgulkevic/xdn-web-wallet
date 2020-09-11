import React from "react";
import {IconButton, TableCell} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export const DeleteTableCell = ({el, item}) => {

    const showCell = () => {
        if (!el.show)
            return true;

        return el.show(item);
    }

    return (
        <>
            <TableCell>
                {
                    showCell() &&
                    <IconButton color="default"
                                size="small"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    el.onClickCallback(item)
                                }}>
                        <DeleteIcon/>
                    </IconButton>
                }
            </TableCell>
        </>
    );
}
