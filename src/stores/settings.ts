import { defineStore } from 'pinia';
import { ref } from 'vue';
import { VueCookieNext } from 'vue-cookie-next';

enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export const SettingsStore = defineStore('settings', () => {
  const openaiApiKey = ref<string>('')
  const theme = ref<Theme>(Theme.Dark)

  function save() {
    VueCookieNext.setCookie('openaiApiKey', openaiApiKey.value)
  }

  function load() {
    openaiApiKey.value = VueCookieNext.getCookie('openaiApiKey')
  }

  function loadTheme() {
    theme.value = VueCookieNext.getCookie('theme') || 'dark'
    document.documentElement.setAttribute('data-bs-theme', theme.value)
  }

  function toggleTheme() {
    if (theme.value === 'dark') {
      theme.value = Theme.Light
    } else {
      theme.value = Theme.Dark
    }
    document.documentElement.setAttribute('data-bs-theme', theme.value)

    VueCookieNext.setCookie('theme', theme.value)
  }

  return { openaiApiKey, theme, save, load, loadTheme, toggleTheme }
})
