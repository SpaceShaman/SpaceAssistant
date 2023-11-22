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

enum Languages {
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
  const toggleThemeCommand = ref<string>('change theme')
  const lang = ref<Languages>(Languages.englishUS)

  function save() {
    VueCookieNext.setCookie('openaiApiKey', openaiApiKey.value)
    VueCookieNext.setCookie('voice', voice.value)
    VueCookieNext.setCookie('model', model.value)
    VueCookieNext.setCookie('startCommands', startCommand.value)
    VueCookieNext.setCookie('toggleThemeCommand', toggleThemeCommand.value)
    VueCookieNext.setCookie('lang', lang.value)
    VueCookieNext.setCookie('theme', theme.value)
  }

  function load() {
    openaiApiKey.value = VueCookieNext.getCookie('openaiApiKey') || ''
    voice.value = VueCookieNext.getCookie('voice') || Voices.alloy
    model.value = VueCookieNext.getCookie('model') || Models.gpt3trubo
    startCommand.value = VueCookieNext.getCookie('startCommands') || 'computer'
    toggleThemeCommand.value = VueCookieNext.getCookie('toggleThemeCommand') || 'change theme'
    lang.value = VueCookieNext.getCookie('lang') || Languages.englishUS
    theme.value = VueCookieNext.getCookie('theme') || Themes.dark
  }

  return { openaiApiKey, theme, voice, model, startCommand, toggleThemeCommand, lang, save, load }
})

export { Languages, Models, SettingsStore, Themes, Voices };
