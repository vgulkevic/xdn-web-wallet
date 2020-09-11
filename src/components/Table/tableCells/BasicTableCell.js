import React from "react";
import {TableCell} from "@material-ui/core";

export const BasicTableCell = ({el, item}) => {
    return (
        <>
            {
                <TableCell>
                    {
                        el.valueGetter
                            ?
                            el.valueGetter(item)
                            :
                            item[el.id]
                    }
                </TableCell>
            }
        </>
    );
}
