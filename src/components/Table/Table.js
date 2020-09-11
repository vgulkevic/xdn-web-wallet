import React, {useEffect, useState} from "react";

import {Table, TableBody, TableCell, TableContainer, TablePagination, TableRow} from "@material-ui/core";

import EnhancedTableHead from "./TableHead";
import TablePaginationActions from "./TablePaginationActions";
import useStyles from "./tableStyles";
import {PageLoader} from "../PageLoader";
import {getSorting, stableSort} from "./tableUtils";
import {TableCellForTable} from "./tableCells/TableCellForTable";
import './tableStyles.css';
import {useSelector} from "react-redux";
import {NAVIGATION_MENU_STORE_NAME} from "../SidebarMenu/redux/navigationMenuSlice";

export const EnhancedTable = ({headCells, tableElements, isLoading, tableElementOnClick, disablePagination, overFlowScroll}) => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(null);
    const [page, setPage] = useState(0);
    const [elementsPerPage, setElementsPerPage] = useState(20);

    const {sidebarOpen} = useSelector(state => state[NAVIGATION_MENU_STORE_NAME]);

    const handleRequestSort = (property) => {
        const isCurrentOrderDesc = orderBy.id === property.id && order === 'desc';
        setOrder(isCurrentOrderDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const getElementsPerPage = () => {
        return overFlowScroll ? 5 : elementsPerPage;
    }

    const emptyElements = getElementsPerPage() - Math.min(getElementsPerPage(), tableElements.length - page * getElementsPerPage());

    useEffect(() => {
        if (!orderBy && headCells.length > 0) {
            setOrderBy(
                {
                    id: headCells[0].id,
                    valueGetter: headCells[0].valueGetter,
                    comparator: headCells[0].comparator
                }
            );
        }
    }, [headCells, orderBy]);

    return (
        <>
            <TableContainer style={overFlowScroll && {maxHeight: '318px', overflowY: 'scroll'}} className={overFlowScroll && 'alwaysShowToolbar'}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='medium'
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy || {}}
                        onRequestSort={handleRequestSort}
                        headCells={headCells}
                    />

                    {isLoading
                        ?
                        null
                        :
                        <TableBody>
                            {stableSort(tableElements, getSorting(order, orderBy))
                                .slice(disablePagination ? 0 : (page * elementsPerPage), disablePagination ? tableElements.length : (page * elementsPerPage + elementsPerPage))
                                .map((item, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            className={index % 2 !== 0 ? classes.rowGrey : classes.rowWhite}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                            onClick={(e) => {
                                                if (tableElementOnClick) {
                                                    tableElementOnClick(item);
                                                }
                                            }}
                                        >
                                            {headCells.map((el, i) => {
                                                return <TableCellForTable el={el} key={i} item={item}/>
                                            })}
                                        </TableRow>
                                    );
                                })}
                            {emptyElements > 0 && (
                                <TableRow style={{height: (53) * emptyElements, cursor: 'auto'}}>
                                    <TableCell colSpan={headCells.length}/>
                                </TableRow>
                            )}
                        </TableBody>
                    }
                </Table>
            </TableContainer>

            {isLoading ? <div style={{paddingBottom: `50px`}}><PageLoader/></div> : null}

            {
                disablePagination ? null :
                <footer className={classes.footer} style={{left: sidebarOpen ? 240 : 0}}>
                    <TablePagination
                        classes={{
                            spacer: classes.spacer,
                        }}
                        rowsPerPageOptions={[8, 15, 20, 35, 50]}
                        labelDisplayedRows={({from, to, count}) => `${from} - ${to} of ${count}`}
                        component="div"
                        count={tableElements.length}
                        rowsPerPage={elementsPerPage}
                        page={page}
                        onChangePage={(e, newPage) => setPage(newPage)}
                        onChangeRowsPerPage={(e) => {
                            setElementsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        ActionsComponent={TablePaginationActions}
                    />
                </footer>
            }
        </>
    );
}