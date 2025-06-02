import { createPinia } from 'pinia';
import { createApp } from 'vue';

import './style.css';
import App from './App.vue';

import 'virtual:uno.css';
import Antd from 'ant-design-vue';

import { setupI18n } from './i18n';
import router from './router';
const app = createApp(App);
setupI18n(app);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(Antd).mount('#app');
