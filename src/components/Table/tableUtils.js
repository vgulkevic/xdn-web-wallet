export const desc = (a, b, orderBy) => {
    let valA;
    let valB;

    if (!orderBy) {
        return 0;
    }

    if (orderBy.comparator) {
        return orderBy.comparator(a, b);
    }

    if (orderBy.valueGetter) {
        valA = orderBy.valueGetter(a);
        valB = orderBy.valueGetter(b);
    } else {
        valA = a[orderBy.id];
        valB = b[orderBy.id];
    }

    if (valB < valA) {
        return -1;
    }
    if (valB > valA) {
        return 1;
    }

    return 0;
}

export const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}
