import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import 'virtual:uno.css'
import Antd from 'ant-design-vue'
import router from "./router";
const app = createApp(App);
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Antd).mount('#app');

