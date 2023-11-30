import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { setupListener } from "@/listener/backgroundListener";
import "@morev/vue-transitions/styles";

const app = createApp(App);
const pinia = createPinia()
setupListener()
app.use(router)
app.use(pinia)
app.mount('#app')



