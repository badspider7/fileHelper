import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { setupListener } from "./listener/backgroundListener";
import directives from './directives'
import "@morev/vue-transitions/styles";
import SvgIcon from './components/SvgIcon.vue'

const app = createApp(App);

app.component('SvgIcon', SvgIcon)
const pinia = createPinia()
setupListener()
app.use(router)
app.use(pinia)
app.use(directives)
app.mount('#app')



