import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './index.css'

const pinia = createPinia()
const vue3APP = createApp(App)

pinia.use(piniaPluginPersist)

vue3APP.use(pinia)
vue3APP.use(router)
// vue3APP.use(APlayer, {productionTip: false})
vue3APP.use(ElementPlus)

vue3APP.mount('#app')
