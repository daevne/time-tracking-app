export const storageService = {
    saveEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('timeEntries')) || [];
        entries.push(entry);
        localStorage.setItem('timeEntries', JSON.stringify(entries));
    },
    getEntries() {
        return JSON.parse(localStorage.getItem('timeEntries')) || [];
    },
    deleteEntry(id) {
        let entries = JSON.parse(localStorage.getItem('timeEntries')) || [];
        entries = entries.filter(entry => entry.id !== id);
        localStorage.setItem('timeEntries', JSON.stringify(entries));
    },
    getEntryById(id) {
        let entries = JSON.parse(localStorage.getItem('timeEntries')) || [];
        return entries.find(entry => entry.id === id);
    },
    updateEntry(updatedEntry) {
        let entries = JSON.parse(localStorage.getItem('timeEntries')) || [];
        entries = entries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry);
        localStorage.setItem('timeEntries', JSON.stringify(entries));
    }
};