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

interface Menu {
    key: string;
    type: 'text' | 'select';
    label: string;
    options?: string[];
  }

const SettingsStore = defineStore('settings', () => {
  const openaiApiKey = ref<string>('')
  const lang = ref<Languages>(Languages.englishUS)
  const voice = ref<Voices>(Voices.alloy)
  const model = ref<Models>(Models.gpt3trubo)
  const startCommand = ref<string>('computer')
  const toggleThemeCommand = ref<string>('change theme')
  const theme = ref<Themes>(Themes.dark)

  function save() {
    VueCookieNext.setCookie('openaiApiKey', openaiApiKey.value)
    VueCookieNext.setCookie('lang', lang.value)
    VueCookieNext.setCookie('voice', voice.value)
    VueCookieNext.setCookie('model', model.value)
    VueCookieNext.setCookie('startCommands', startCommand.value)
    VueCookieNext.setCookie('toggleThemeCommand', toggleThemeCommand.value)
    VueCookieNext.setCookie('theme', theme.value)
  }

  function load() {
    openaiApiKey.value = VueCookieNext.getCookie('openaiApiKey') || ''
    lang.value = VueCookieNext.getCookie('lang') || Languages.englishUS
    voice.value = VueCookieNext.getCookie('voice') || Voices.alloy
    model.value = VueCookieNext.getCookie('model') || Models.gpt3trubo
    startCommand.value = VueCookieNext.getCookie('startCommands') || 'computer'
    toggleThemeCommand.value = VueCookieNext.getCookie('toggleThemeCommand') || 'change theme'
    theme.value = VueCookieNext.getCookie('theme') || Themes.dark
  }

  const menu: Menu[] = [
    { 
      key: 'openaiApiKey',
      type: 'text', 
      label: 'OpenAI Api Key',
    },
    { 
      key: 'lang',
      type: 'select', 
      label: 'Language',
      options: Object.values(Languages),
    },
    { 
      key: 'voice',
      type: 'select', 
      label: 'Voice',
      options: Object.values(Voices),
    },
    { 
      key: 'model',
      type: 'select', 
      label: 'Model',
      options: Object.values(Models),
    },
    { 
      key: 'startCommand',
      type: 'text', 
      label: 'Start Command',
    },
    { 
      key: 'toggleThemeCommand',
      type: 'text', 
      label: 'Toggle Theme Command',
    },
    { 
      key: 'theme',
      type: 'select', 
      label: 'Theme',
      options: Object.values(Themes),
    }
  ]

  return { 
    openaiApiKey, 
    theme, 
    voice, 
    model, 
    startCommand, 
    toggleThemeCommand, 
    lang, 
    save, 
    load,
    menu,
  }
})

export { Languages, Models, SettingsStore, Themes, Voices };
