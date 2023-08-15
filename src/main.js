import "./styles/common.scss"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import App from './App.vue'
import router from './router'
import {lazyPlugin} from "@/directives/lazy-load";
import {componentsPlugin} from "@/components/components";
const app = createApp(App)
app.use(componentsPlugin)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
