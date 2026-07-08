import { createApp } from 'vue';
import App from './App.vue';
import { primeVueOpt } from './assets/ts/preSet.ts';

import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';
// import 'primeicons/primeicons.css';

import './assets/css/00.root.css';
import './assets/css/01.reset.css';
// 注入生成的原子类 CSS
import 'virtual:uno.css';

const app = createApp(App);

app.directive('ripple', Ripple);
app.use(ToastService);

app.use(PrimeVue, primeVueOpt);

app.mount('#app');
