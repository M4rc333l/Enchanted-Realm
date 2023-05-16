import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index.js'
import 'bootstrap';
import './background.js';

createApp(App).use(Router).mount('#app')
