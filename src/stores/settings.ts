import { defineStore } from 'pinia';
import { ref } from 'vue';
import { VueCookieNext } from 'vue-cookie-next';

enum Themes {
  dark = 'dark',
  light = 'light',
}

enum Voices {
  alloy = 'alloy',
  echo = 'echo',
  fable = 'fable',
  onyx = 'onyx',
  nova = 'nova',
  shimmer = 'shimmer',
}

const SettingsStore = defineStore('settings', () => {
  const openaiApiKey = ref<string>('')
  const theme = ref<Themes>(Themes.dark)
  const voice = ref<Voices>(Voices.alloy)

  function save() {
    VueCookieNext.setCookie('openaiApiKey', openaiApiKey.value)
    VueCookieNext.setCookie('voice', voice.value)
  }

  function load() {
    openaiApiKey.value = VueCookieNext.getCookie('openaiApiKey') || ''
    voice.value = VueCookieNext.getCookie('voice') || Voices.alloy
  }

  function loadTheme() {
    theme.value = VueCookieNext.getCookie('theme') || 'dark'
    document.documentElement.setAttribute('data-bs-theme', theme.value)
  }

  function toggleTheme() {
    if (theme.value === 'dark') {
      theme.value = Themes.light
    } else {
      theme.value = Themes.dark
    }
    document.documentElement.setAttribute('data-bs-theme', theme.value)

    VueCookieNext.setCookie('theme', theme.value)
  }

  return { openaiApiKey, theme, voice, save, load, loadTheme, toggleTheme }
})

export { SettingsStore, Voices };
