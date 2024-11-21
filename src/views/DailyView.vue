<template>
    <div>
        <h4>{{ selectedDate }}</h4>
        <EntryList :entries="filteredEntries" :showDate="false" @edit-entry="editEntry" @delete-entry="deleteEntry" />
    </div>
</template>

<script>
import EntryList from '@/components/EntryList.vue';
import { filterEntries } from '@/utils/filterEntries';

export default {
    components: {
        EntryList
    },
    props: {
        entries: Array,
        selectedDate: String,
        editEntry: Function,  
        deleteEntry: Function
    },
    computed: {
        filteredEntries() {
            return filterEntries(this.entries, this.selectedDate, this.selectedDate, 'day');
        }
    }
};
</script>
