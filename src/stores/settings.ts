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

enum Models {
  gpt3trubo = 'gpt-3.5-turbo',
  gpt3turbo16k = 'gpt-3.5-turbo-16k',
  gpt4 = 'gpt-4',
}

enum CommandsLanguages {
  englishUS = 'en-US',
  englishGB = 'en-GB',
  spanish = 'es-ES',
  german = 'de-DE',
  italian = 'it-IT',
  french = 'fr-FR',
  japanese = 'ja-JP',
  russian = 'ru-RU',
  brazil = 'pt-PT',
  polish = 'pl-PL',
  indonesian = 'id-ID',
  dutch = 'nl-NL',
  chineseCantonese = 'zh-HK',
  chineseMandarin = 'zh-CN',
  hindi = 'hi-IN',
}

const SettingsStore = defineStore('settings', () => {
  const openaiApiKey = ref<string>('')
  const theme = ref<Themes>(Themes.dark)
  const voice = ref<Voices>(Voices.alloy)
  const model = ref<Models>(Models.gpt3trubo)
  const startCommand = ref<string>('computer')
  const stopCommand = ref<string>('stop')
  const commandsLanguage = ref<CommandsLanguages>(CommandsLanguages.englishUS)

  function save() {
    VueCookieNext.setCookie('openaiApiKey', openaiApiKey.value)
    VueCookieNext.setCookie('voice', voice.value)
    VueCookieNext.setCookie('model', model.value)
    VueCookieNext.setCookie('startCommands', startCommand.value)
    VueCookieNext.setCookie('stopCommands', stopCommand.value)
    VueCookieNext.setCookie('commandsLanguage', commandsLanguage.value)
  }

  function load() {
    openaiApiKey.value = VueCookieNext.getCookie('openaiApiKey') || ''
    voice.value = VueCookieNext.getCookie('voice') || Voices.alloy
    model.value = VueCookieNext.getCookie('model') || Models.gpt3trubo
    startCommand.value = VueCookieNext.getCookie('startCommands') || 'computer'
    stopCommand.value = VueCookieNext.getCookie('stopCommands') || 'stop'
    commandsLanguage.value = VueCookieNext.getCookie('commandsLanguage') || CommandsLanguages.englishUS
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

  return { openaiApiKey, theme, voice, model, startCommand, stopCommand, commandsLanguage, save, load, loadTheme, toggleTheme }
})

export { CommandsLanguages, Models, SettingsStore, Voices };
