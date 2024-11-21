<template>
    <ul class="list-group">
        <li 
            v-for="entry in entries" 
            :key="entry.id" 
            class="list-group-item border-0 shadow-sm mb-3 rounded">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <strong class="d-block">
                        <template v-if="showDate">
                            <span class="text-primary me-2">{{ entry.date }}</span> 
                        </template>
                        <span class="text-secondary">{{ entry.startTime }} - {{ entry.endTime }}</span>
                    </strong>
                    <p class="mb-1">{{ entry.description }}</p>
                    <p v-if="entry.tags && entry.tags.length" class="mb-0">
                        <strong class="text-muted">Címkék:</strong> 
                        <span class="badge bg-info text-dark ms-1">{{ entry.tags }}</span>
                    </p>
                </div>
                <div class="d-flex align-items-center">
                    <button 
                        @click="$emit('edit-entry', entry.id)" 
                        class="btn btn-outline-primary btn-sm me-2">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button 
                        @click="$emit('delete-entry', entry.id)" 
                        class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </li>
    </ul>
</template>


<script>
export default {
    props: {
        entries: Array,
        showDate: {
            type: Boolean,
            default: true
        }
    }
};
</script>