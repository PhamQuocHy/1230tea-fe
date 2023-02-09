export function changeMonthToEnglish(number: Number) {
    if (number === 1) {
        return 'Jan'
    } else if (number === 2) {
        return 'Feb'
    } else if (number === 3) {
        return 'Mar'
    } else if (number === 4) {
        return 'Apr'
    } else if (number === 5) {
        return 'May'
    } else if (number === 6) {
        return 'Jun'
    } else if (number === 7) {
        return 'Jul'
    } else if (number === 8) {
        return 'Aug'
    } else if (number === 9) {
        return 'Sep'
    } else if (number === 10) {
        return 'Oct'
    } else if (number === 11) {
        return 'Nov'
    } else if (number === 12) {
        return 'Dec'
    }
}

export function changeEnglishToMonth(name: string) {
    if (name === 'Jan') {
        return 1
    } else if (name === 'Feb') {
        return 2
    } else if (name === 'Mar') {
        return 3
    } else if (name === 'Apr') {
        return 4
    } else if (name === 'May') {
        return 5
    } else if (name === 'Jun') {
        return 6
    } else if (name === 'Jul') {
        return 7
    } else if (name === 'Aug') {
        return 8
    } else if (name === 'Sep') {
        return 9
    } else if (name === 'Oct') {
        return 10
    } else if (name === 'Nov') {
        return 11
    } else if (name === 'Dec') {
        return 12
    }
}