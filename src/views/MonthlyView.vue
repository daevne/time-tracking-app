<template>
    <div>
        <h4>{{ monthName }}</h4>
        <EntryList :entries="filteredEntries" @edit-entry="editEntry" @delete-entry="deleteEntry" />
    </div>
</template>

<script>
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { hu } from 'date-fns/locale';
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
            const startOfMonthDate = startOfMonth(today);
            const endOfMonthDate = endOfMonth(today);      
            
            return filterEntries(this.entries, startOfMonthDate, endOfMonthDate);
        },
        monthName() {
            const today = new Date();
            const month = format(today, 'MMMM', { locale: hu });
            return month.charAt(0).toUpperCase() + month.slice(1);
        }
    }
};
</script>
