import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueCookies from 'vue-cookies'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(VueCookies, { expires: '30d' })
app.mount('#app')
