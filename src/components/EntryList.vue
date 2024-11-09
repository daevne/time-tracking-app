<template>
    <ul class="list-group">
        <li v-for="entry in entries" :key="entry.id" class="list-group-item mb-2">
            <div class="d-flex justify-content-between">
                <div>
                    <strong>
                        <template v-if="showDate">{{ entry.date }} </template>
                        {{ entry.startTime }} - {{ entry.endTime }}
                    </strong>
                    <p>{{ entry.description }}</p>
                    <p v-if="entry.tags && entry.tags.length"><strong>Címkék:</strong> {{ entry.tags }}</p>
                </div>
                <div class="d-flex align-items-center">
                    <button @click="$emit('edit-entry', entry.id)" class="btn btn-primary btn-sm me-2">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button @click="$emit('delete-entry', entry.id)" class="btn btn-danger btn-sm">
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