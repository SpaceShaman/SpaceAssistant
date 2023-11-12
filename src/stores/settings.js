import { defineStore } from 'pinia'
import { ref } from 'vue'
import VueCookies from 'vue-cookies'

export const SettingsStore = defineStore('settings', () => {
  const openaiApiKey = ref('')

  function save() {
    VueCookies.set('openaiApiKey', openaiApiKey.value)
  }

  function load() {
    openaiApiKey.value = VueCookies.get('openaiApiKey')
  }

  return { openaiApiKey, save, load }
})
