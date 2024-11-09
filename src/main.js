import { createApp } from 'vue';
import mitt from 'mitt';
import App from './App.vue';

// Importing styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Creating the event emitter
const emitter = mitt();

// Creating the Vue app instance
const app = createApp(App);

// Using a plugin to provide the emitter globally
app.use({
    install(app) {
        app.config.globalProperties.emitter = emitter;
    }
});

// Mounting the app
app.mount('#app');