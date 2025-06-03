import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import { setupI18n } from './i18n';
import router from './router';
import './style.css';

import 'virtual:uno.css';

const app = createApp(App);
setupI18n(app);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(Antd).mount('#app');
