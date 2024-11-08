<template>
  <div id="app" class="container-fluid" style="font-family: 'Merienda', sans-serif;">
    <div class="row title mb-5">
      <div class="col-12 bg-dark text-white text-center py-2">
        <h1>Munkaidő Nyilvántartó</h1>
      </div>
    </div>

    <div class="row entry-form mb-3">
      <TimeEntryForm 
        @entryAdded="handleEntryAdded" 
        :entryToEdit="entryToEdit"
        :showNotification="showNotification" 
      />
    </div>

    <div class="row notification mb-3 p-2">
      <Notification v-if="notification.message" :message="notification.message" :type="notification.type" />
    </div>

    <div class="row entry-list p-2">
      <TimeEntryList 
        :currentView="currentView" 
        :selectedDate="selectedDate" 
        :entries="entries"
        @entryAdded="handleEntryAdded"
        @entryDeleted="handleEntryDeleted"
        @entryEdited="handleEntryEdited"
      />
    </div>
  </div>
</template>

<script>
  import Notification from './components/Notification.vue';
  import TimeEntryForm from './components/TimeEntryForm.vue';
  import TimeEntryList from './components/TimeEntryList.vue';
  import { storageService } from './storageService';

  export default {
    name: 'App',
    components: {
      Notification,
      TimeEntryForm,
      TimeEntryList,
    },
    data() {
      return {
        entries: [],
        currentView: 'daily',
        selectedDate: new Date().toISOString().substr(0, 10),
        notification: {
          message: '',
          type: ''
        },
        entryToEdit: {},
      };
    },
    created() {
      this.emitter.on('entryAdded', () => {
        this.showNotification('Bejegyzés sikeresen elmentve!', 'success');
      });      
      this.emitter.on('entryDeleted', () => {
        this.showNotification('Bejegyzés sikeresen törölve!', 'danger');
      });      
      this.emitter.on('entryEdited', () => {
        this.showNotification('Bejegyzés sikeresen módosítva!', 'info');
      });
    },
    methods: {
      handleEntryAdded() {
        this.entryToEdit = {};
        this.refreshEntries();
      },
      handleEntryEdited(id) {
        const entry = storageService.getEntryById(id);
        if (entry) {
          this.entryToEdit = { ...entry };
        }
        this.refreshEntries();
      },
      handleEntryDeleted() {
        this.refreshEntries();
      },
      showNotification(message, type) {
        this.notification = { message, type };
      },
      refreshEntries() {
        this.entries = storageService.getEntries();
      },    
    },
    mounted() {
      this.refreshEntries();
    }
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Merienda:wght@300..900&display=swap');

  #app {
    font-family: 'Merienda', sans-serif;
    background-color:aliceblue;
  }

  h1 {
    font-size: 2.5rem;
  }

  .title {
    background-color: #343a40;
  }

  .list-group-item {
    background-color: #f8f9fa;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
  } 
</style>
