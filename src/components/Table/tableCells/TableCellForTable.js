import React from "react";
import {CustomTableCell} from "./CustomTableCell";
import {BasicTableCell} from "./BasicTableCell";
import {DeleteTableCell} from "./DeleteTableCell";
import {EditTableCell} from "./EditTableCell";

export const TableCellForTable = ({el, item}) => {

    const getCell = () => {
        if (el.id === "edit") {
            return <EditTableCell el={el} item={item}/>;
        }

        if (el.id === "delete") {
            return <DeleteTableCell el={el} item={item}/>;
        }

        if (el.custom && el.custom.element) {
            return <CustomTableCell el={el} item={item}/>
        }

        return <BasicTableCell el={el} item={item}/>;
    }

    return (
        <>
            {getCell()}
        </>
    );
}
