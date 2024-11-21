<template>
    <div class="container my-3 p-3 bg-light rounded shadow-sm">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-6">
                <h2 class="text-center mb-2 text-primary">{{ formTitle }}</h2>
                <NotificationAlert 
                    v-if="notification.message" 
                    :message="notification.message" 
                    :type="notification.type" 
                />
                <form @submit.prevent="handleSubmit">
                    <div class="form-floating mb-3">
                        <input 
                            type="date" 
                            v-model="entry.date" 
                            required 
                            class="form-control" 
                            id="date" 
                            placeholder="Dátum">
                        <label for="date">Dátum</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input 
                            type="time" 
                            v-model="entry.startTime" 
                            required 
                            class="form-control" 
                            id="startTime" 
                            placeholder="Kezdés Időpontja">
                        <label for="startTime">Kezdés Időpontja</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input 
                            type="time" 
                            v-model="entry.endTime" 
                            required 
                            class="form-control" 
                            id="endTime" 
                            placeholder="Befejezés Időpontja">
                        <label for="endTime">Befejezés Időpontja</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea 
                            v-model="entry.description" 
                            required 
                            class="form-control" 
                            id="description" 
                            placeholder="Feladat Leírása"></textarea>
                        <label for="description">A feladat leírása</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input 
                            type="text" 
                            v-model="entry.tags" 
                            class="form-control" 
                            id="tags" 
                            placeholder="Címkék (vesszővel elválasztva)">
                        <label for="tags">Címkék (vesszővel elválasztva)</label>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary btn-lg">Mentés</button>
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
