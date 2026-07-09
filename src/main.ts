import { createApp } from 'vue';
import App from './App.vue';
import { primeVueOpt } from './assets/ts/preSet.ts';

import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import router from './router/index.ts';
import 'primeicons/primeicons.css';

import './assets/css/00.root.css';
import './assets/css/01.reset.css';
import './assets/css/02.animate.css';
// 注入生成的原子类 CSS
import 'virtual:uno.css';

const app = createApp(App);

app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);
app.use(router);
app.use(ToastService);

app.use(PrimeVue, primeVueOpt);

app.mount('#app');
