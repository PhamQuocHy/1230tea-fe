export function setColorFloor (value: number) {
    if (value === 1) {
        return "#26C281";
    } else if (value === 2) {
        return "#cf663d";
    } else if (value === 3) {
        return "#FE7A7B";
    } else if (value === 4) {
        return "#F9CF05";
    } else if (value === 5) {
        return "#C9CBCF";
    }
    return '';
}