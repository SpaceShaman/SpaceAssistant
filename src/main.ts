import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueCookieNext } from 'vue-cookie-next'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(VueCookieNext)
app.mount('#app')

VueCookieNext.config({ expire: '30d' })