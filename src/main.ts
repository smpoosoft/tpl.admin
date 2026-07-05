import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import { primeVueOpt } from './assets/ts/preSet.ts';

import './assets/css/00.reset.css';

const app = createApp(App);


app.use(
  PrimeVue, primeVueOpt);

app.mount('#app');
