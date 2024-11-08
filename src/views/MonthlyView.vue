<template>
    <div>
        <h2>{{ monthName }}</h2>
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
    import { 
        startOfMonth, 
        endOfMonth, 
        isWithinInterval, 
        parseISO, 
        compareAsc, 
        format 
    } from 'date-fns';
    import { hu } from 'date-fns/locale';

    export default {
        props: {
            entries: Array,
            editEntry: Function,
            deleteEntry: Function
        },
        computed: {
            filteredEntries() {
                const today = new Date();
                const startOfMonthDate = startOfMonth(today);
                const endOfMonthDate = endOfMonth(today);      
                
                return this.entries
                    .filter(entry => {
                        const entryDate = parseISO(entry.date);
                        return isWithinInterval(entryDate, { start: startOfMonthDate, end: endOfMonthDate });
                    })
                    .sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));
            },
            monthName() {
                const today = new Date();
                const month = format(today, 'MMMM', { locale: hu });
                return month.charAt(0).toUpperCase() + month.slice(1);
            }
        }
    };
</script>
