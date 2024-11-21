<template>
    <div class="container p-4 bg-light rounded shadow-sm">
        <div class="row mb-3">
            <div class="col-12">
                <h2 class="text-center text-primary">Bejegyzések</h2>
            </div>
        </div>
        <div class="row mb-4 text-center">
            <div class="col-12 col-lg-6 offset-lg-3">
                <fieldset class="border p-3 rounded">
                    <legend class="float-none w-auto px-2 text-secondary">Nézet választása</legend>
                    <div class="d-flex justify-content-center gap-3">
                        <div class="form-check">
                            <input 
                                class="form-check-input" 
                                type="radio" 
                                id="daily" 
                                value="daily" 
                                v-model="currentView" 
                                name="viewOption">
                            <label class="form-check-label" for="daily">
                                Ma
                            </label>
                        </div>
                        <div class="form-check">
                            <input 
                                class="form-check-input" 
                                type="radio" 
                                id="weekly" 
                                value="weekly" 
                                v-model="currentView" 
                                name="viewOption">
                            <label class="form-check-label" for="weekly">
                                Ezen a héten
                            </label>
                        </div>
                        <div class="form-check">
                            <input 
                                class="form-check-input" 
                                type="radio" 
                                id="monthly" 
                                value="monthly" 
                                v-model="currentView" 
                                name="viewOption">
                            <label class="form-check-label" for="monthly">
                                Ebben a hónapban
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-8 offset-md-2">
                <component 
                    :is="currentComponent" 
                    :entries="entries" 
                    :selectedDate="selectedDate" 
                    :deleteEntry="deleteEntry"
                    :editEntry="editEntry"
                    class="border p-4 rounded bg-white shadow-sm"
                />
            </div>
        </div>
    </div>
</template>
    
<script>
    import { storageService } from '../storageService';
    import DailyView from '../views/DailyView.vue';
    import WeeklyView from '../views/WeeklyView.vue';
    import MonthlyView from '../views/MonthlyView.vue';
    
    export default {
        components: {
            DailyView,
            WeeklyView,
            MonthlyView
        },
        data() {
            return {
                entries: [],
                currentView: 'daily',
                selectedDate: new Date().toISOString().split('T')[0],
            };
        },
        created() {
            this.emitter.on('entryAdded', () => {
                this.updateEntries();
                this.$emit('entryAdded');
            });
            this.emitter.on('entryEdited', () => {
                this.updateEntries();
                this.$emit('entryEdited');
            });
        },
        computed: {
            currentComponent() {
            return this.currentView === 'monthly' ? 'MonthlyView' :
                this.currentView === 'weekly' ? 'WeeklyView' :
                'DailyView';
            }
        },
        mounted() {
            this.updateEntries();
        },
        methods: {
            updateEntries() {
                this.entries = storageService.getEntries();
            },
            deleteEntry(id) {
                storageService.deleteEntry(id);
                this.updateEntries();
                this.emitter.emit('entryDeleted');
                this.$emit('entryDeleted');
            },
            editEntry(id) {                
                this.$emit('entryEdited', id);
            },
        }
    };
</script>