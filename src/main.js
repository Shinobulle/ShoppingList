import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from '@/pages/TheShoppingList.vue';
import './css/index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
app.mount('#app')
