import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import { setupI18n } from './i18n';
import router from './router';
import permission from '@/directives/permission';
import './style.css';
import './assets/styles/theme.less';
import 'virtual:uno.css';

const app = createApp(App);
setupI18n(app);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// 注册全局权限指令
app.directive('permission', permission);

app.mount('#app');
