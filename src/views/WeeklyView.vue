<template>
    <div>
        <h4>{{ weekNumber }}. Hét</h4>
        <EntryList :entries="filteredEntries" @edit-entry="editEntry" @delete-entry="deleteEntry" />
    </div>
</template>

<script>
import { startOfWeek, endOfWeek, getWeek } from 'date-fns';
import EntryList from '@/components/EntryList.vue';
import { filterEntries } from '@/utils/filterEntries';

export default {
    components: {
        EntryList
    },
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
            
            return filterEntries(this.entries, startOfWeekDate, endOfWeekDate);
        },
        weekNumber() {
            const today = new Date();
            return getWeek(today, { weekStartsOn: 1 });
        }
    }
};
</script>