import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'

const vue3APP = createApp(App)

vue3APP.use(router)
// vue3APP.use(APlayer, {productionTip: false})
vue3APP.use(ElementPlus)

vue3APP.mount('#app')
