import React from "react";
import {TableCell} from "@material-ui/core";

export const CustomTableCell = ({el, item}) => {
    return (
        <>
            {
                <TableCell style={{textAlign: el.custom.alignCenter && "center"}}
                           {...(el.custom.cellProps ? el.custom.cellProps(item) : {})}>
                    {el.custom.element(item)}
                </TableCell>
            }
        </>
    );
}
