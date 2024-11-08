<template>
    <div>
        <h2>{{ weekNumber }}. Hét</h2>
        <ul class="list-group">
            <li v-for="entry in filteredEntries" :key="entry.id" class="list-group-item mb-2">
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>{{ entry.date }} {{ entry.startTime }} - {{ entry.endTime }}</strong>
                        <p>{{ entry.description }}</p>
                        <p v-if="entry.tags && entry.tags.length"><strong>Címkék:</strong> {{ entry.tags }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <button @click="editEntry(entry.id)" class="btn btn-primary btn-sm me-2">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button @click="deleteEntry(entry.id)" class="btn btn-danger btn-sm">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
        </div>
    </template>
    
    <script>
    import { startOfWeek, endOfWeek, isWithinInterval, parseISO, getWeek } from 'date-fns';
    
    export default {
        props: {
            entries: Array,
            editEntry: Function,
            deleteEntry: Function
        },
        computed: {
            filteredEntries() {
                const today = new Date();
                const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
                const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });
                
                return this.entries.filter(entry => {
                const entryDate = parseISO(entry.date);
                return isWithinInterval(entryDate, { start: startOfWeekDate, end: endOfWeekDate });
                });
            },
            weekNumber() {
                const today = new Date();
                return getWeek(today, { weekStartsOn: 1 });
            }
        }
    };
</script>