// if field is different to .timestamp - add getter func as argument
export const timeHeadCell = (id, label, valueGetter) => {
    return {
        id: id, label: label, valueGetter: (model) => {
            return getFormattedTimestamp(valueGetter(model));
        },
        comparator: (a, b) => {
            return getDateTimeComparator(timestampToDate(valueGetter(a)), timestampToDate(valueGetter(b)));
        }
    }
}

const getDateTimeComparator = (valA, valB) => {
    if (valB.getTime() < valA.getTime()) {
        return 1;
    }
    if (valB.getTime() > valA.getTime()) {
        return -1;
    }
    return 0;
}

const timestampToDate = (timestamp) => {
    return new Date(timestamp);
}

export const getFormattedTimestamp = (timestamp) => {
    return timestampToDate(timestamp).toLocaleString("en-GB");
}
