export const secondsToDhms = (seconds) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + "d " : "";
    const hDisplay = h > 0 ? h + "h " : "";
    const mDisplay = m > 0 ? m + "m " : "";
    const sDisplay = s > 0 ? s + "s": "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

export const intComparator = (a, b) => {
    if (b < a) {
        return 1;
    }
    if (b > a) {
        return -1;
    }
    return 0;
}
