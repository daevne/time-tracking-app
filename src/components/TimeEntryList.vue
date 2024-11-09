<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2 class="mb-3">Bejegyzések</h2>
            </div>
        </div>
        <div class="row mb-4 text-center">
            <div class="col-12 col-lg-4 offset-lg-4">
                <fieldset>
                    <div class="form-check-inline mb-2">
                        <input class="form-check-input" type="radio" id="daily" value="daily" v-model="currentView" name="viewOption">
                        <label class="form-check-label ms-1" for="daily">
                            Ma
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <input class="form-check-input" type="radio" id="weekly" value="weekly" v-model="currentView" name="viewOption">
                        <label class="form-check-label ms-1" for="weekly">
                            Ezen a héten
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <input class="form-check-input" type="radio" id="monthly" value="monthly" v-model="currentView" name="viewOption">
                        <label class="form-check-label ms-1" for="monthly">
                            Ebben a hónapban
                        </label>
                    </div>
                </fieldset>
            </div>
        </div>
        <div class="row component">
            <div class="col-12 col-md-6 offset-md-3">
                <component 
                    :is="currentComponent" 
                    :entries="entries" 
                    :selectedDate="selectedDate" 
                    :deleteEntry="deleteEntry"
                    :editEntry="editEntry"
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

<style scoped>
    .container {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 20px;
    }
</style>
