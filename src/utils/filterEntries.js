import { isWithinInterval, parseISO, compareAsc, parse } from 'date-fns';

export function filterEntries(entries, startDate, endDate, type = 'range') {
    return entries
        .filter(entry => filterByDate(entry, startDate, endDate, type))
        .sort(compareEntries);
}

function filterByDate(entry, startDate, endDate, type) {
    const entryDate = parseISO(entry.date);
    if (type === 'day') {
        return entry.date === startDate;
    }
    return isWithinInterval(entryDate, { start: startDate, end: endDate });
}

function compareEntries(a, b) {
    const dateComparison = compareAsc(parseISO(a.date), parseISO(b.date));
    if (dateComparison !== 0) {
        return dateComparison;
    }
    const timeA = parse(a.startTime, 'HH:mm', new Date());
    const timeB = parse(b.startTime, 'HH:mm', new Date());
    return compareAsc(timeA, timeB);
}