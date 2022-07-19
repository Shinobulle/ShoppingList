import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from '@/pages/TheShoppingList.vue';
import './css/index.css';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';

const app = createApp(App);
const pinia = createPinia();

app
.use(pinia)
.use(PrimeVue)
.component('Button', Button)
.mount('#app');
