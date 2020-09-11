import React from "react";

import {TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import useStyles from "./tableStyles";

export default function EnhancedTableHead({onRequestSort, order, orderBy, headCells}) {
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => {
                    return (
                        <TableCell
                            className={classes.tableCell}
                            key={headCell.id}
                            sortDirection={orderBy.id === headCell.id ? order : false}
                        >
                            {(headCell.custom && headCell.custom.label) ? headCell.custom.label :
                                <TableSortLabel
                                    className={classes.sortLabel}
                                    classes={{
                                        icon: classes.icon,
                                    }}
                                    IconComponent={ArrowDropDownIcon}
                                    hideSortIcon={orderBy.id !== headCell.id}
                                    active={orderBy.id === headCell.id}
                                    direction={order === 'asc' ? 'desc' : 'asc'}
                                    onClick={() => onRequestSort(
                                        {
                                            id: headCell.id,
                                            valueGetter: headCell.valueGetter,
                                            comparator: headCell.comparator
                                        }
                                    )}
                                >
                                    {headCell.label}
                                </TableSortLabel>}
                        </TableCell>)
                })}
            </TableRow>
        </TableHead>
    );
}