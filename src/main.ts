import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueCookieNext } from 'vue-cookie-next'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const app = createApp(App)

app.use(createPinia())
app.use(VueCookieNext)
app.use(createVuetify({
  components,
  directives,
  theme: {
      defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
},
}))
app.mount('#app')

VueCookieNext.config({ expire: '30d' })