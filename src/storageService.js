const STORAGE_KEY = 'timeEntries';

function getEntriesFromStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveEntriesToStorage(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export const storageService = {
    saveEntry(entry) {
        const entries = getEntriesFromStorage();
        entries.push(entry);
        saveEntriesToStorage(entries);
    },
    getEntries() {
        return getEntriesFromStorage()
    },
    deleteEntry(id) {
        let entries = getEntriesFromStorage()
        entries = entries.filter(entry => entry.id !== id);
        saveEntriesToStorage(entries);
    },
    getEntryById(id) {
        const entries = getEntriesFromStorage();
        return entries.find(entry => entry.id === id);
    },
    updateEntry(updatedEntry) {
        let entries = getEntriesFromStorage();
        entries = entries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry);
        saveEntriesToStorage(entries);
    }
};