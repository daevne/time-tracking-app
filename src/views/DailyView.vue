<template>
    <div>
        <h2>{{ selectedDate }}</h2>
        <ul class="list-group">
            <li v-for="entry in filteredEntries" :key="entry.id" class="list-group-item mb-2">
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>{{ entry.startTime }} - {{ entry.endTime }}</strong>
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
    export default {
        props: {
            entries: Array,
            selectedDate: String,
            editEntry: Function,  
            deleteEntry: Function
        },
        computed: {
            filteredEntries() {
                return this.entries
                    .filter(entry => entry.date === this.selectedDate)
                    .sort((a, b) => a.startTime.localeCompare(b.startTime));
            }
        }
    };
</script>
