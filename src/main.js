import "./styles/common.scss"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {lazyPlugin} from "@/directives/lazy-load";
import {componentsPlugin} from "@/components/components";
const app = createApp(App)
app.use(componentsPlugin)
app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
