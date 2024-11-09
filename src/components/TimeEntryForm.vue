<template>
    <div class="container mb-4">
        <div class="row">
            <div class="col-12 col-lg-4 offset-lg-4">
                <h2 class="text-center mb-3">{{ formTitle }}</h2>
                <NotificationAlert v-if="notification.message" :message="notification.message" :type="notification.type" />
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="date">Dátum</label>
                        <input type="date" v-model="entry.date" required class="form-control" id="date">
                    </div>
                    <div class="mb-3">
                        <label for="startTime">Kezdés Időpontja</label>
                        <input type="time" v-model="entry.startTime" required class="form-control" id="startTime">
                    </div>
                    <div class="mb-3">
                        <label for="endTime">Befejezés Időpontja</label>
                        <input type="time" v-model="entry.endTime" required class="form-control" id="endTime">
                    </div>
                    <div class="mb-3">
                        <label for="description">Feladat Leírása</label>
                        <textarea v-model="entry.description" required class="form-control" id="description"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="tags">Címkék (vesszővel elválasztva)</label>
                        <input type="text" v-model="entry.tags" class="form-control" id="tags">
                    </div>
                    <div class="mb-3 text-center">
                        <button type="submit" class="btn btn-outline-primary">Mentés</button>
                    </div>                
                </form>
            </div>
        </div>
    </div>
</template>
    
<script>
    import { storageService } from '../storageService';
    import NotificationAlert from './Notification.vue';

    const DEFAULT_ENTRY = {
        date: '',
        startTime: '',
        endTime: '',
        description: '',
        tags: '',
        id: Date.now()
    };

    export default {
        components: {
            NotificationAlert
        },
        props: {
            entryToEdit: {
                type: Object,
                default: () => ({})
            },
            showNotification: Function
        },
        data() {
            return {
                entry: { ...DEFAULT_ENTRY },
                formTitle: 'Új bejegyzés',
                notification: {
                    message: '',
                    type: 'danger'
                }
            };
        },
        watch: {
            entryToEdit: {
                handler(newEntry) {
                    if (newEntry && Object.keys(newEntry).length) {
                        this.entry = { ...newEntry };
                        this.formTitle = 'Bejegyzés módosítása';
                    } else {
                        this.resetForm();
                    }
                },
                immediate: true
            }
        },
        methods: {
            handleSubmit() {
                if (!this.isEndTimeValid()) {
                    this.showNotification('A befejezés időpontja nem lehet korábbi, mint a kezdés időpontja.', 'danger');   
                    return;
                }
                
                if (this.entryToEdit && this.entryToEdit.id) {
                    this.updateEntry();
                } else {
                    this.saveEntry();
                }
                this.resetForm();
            },
            isEndTimeValid() {
                const startDateTime = new Date(`${this.entry.date}T${this.entry.startTime}`);
                const endDateTime = new Date(`${this.entry.date}T${this.entry.endTime}`);
                return endDateTime >= startDateTime;
            },
            updateEntry() {
                storageService.updateEntry(this.entry);
                this.emitter.emit('entryEdited');
            },
            saveEntry() {
                storageService.saveEntry(this.entry);
                this.emitter.emit('entryAdded');
            },
            resetForm() {
                this.entry = { ...DEFAULT_ENTRY };
                this.formTitle = 'Új bejegyzés';
            }
        }
    };
</script>
