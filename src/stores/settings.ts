import { defineStore } from 'pinia'
import { ref } from 'vue'
import VueCookies from 'vue-cookies'

export const SettingsStore = defineStore('settings', () => {
  const openaiApiKey = ref('')
  const theme = ref('dark')

  function save() {
    VueCookies.set('openaiApiKey', openaiApiKey.value)
  }

  function load() {
    openaiApiKey.value = VueCookies.get('openaiApiKey')
  }

  function loadTheme() {
    theme.value = VueCookies.get('theme') || 'dark'
    document.documentElement.setAttribute('data-bs-theme', theme.value)
  }

  function toggleTheme() {
    if (theme.value === 'dark') {
      theme.value = 'light'
    } else {
      theme.value = 'dark'
    }
    document.documentElement.setAttribute('data-bs-theme', theme.value)

    VueCookies.set('theme', theme.value)
  }

  return { openaiApiKey, theme, save, load, loadTheme, toggleTheme }
})
