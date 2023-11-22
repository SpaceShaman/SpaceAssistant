<picture>
  <source media="(prefers-color-scheme: dark)" srcset="logo/logo-dark.png">
  <img src="logo/logo-light.png">
</picture>

Voice assistant built with [Vue.js](https://vuejs.org/). Easily to hack and extend.
It use VoiceRecognition API vie [annyang](https://github.com/TalAter/annyang) library to recognize commands and [OpenAI API](https://platform.openai.com/docs/) to generate text and speech.
All functionalities are built as plugins, so you can easily expand this application by yourself.

You cen check it out [here](https://spaceshaman.github.io/assistant/)

## Dependencies

- [Vue.js](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org)
- [vue-cookies](https://github.com/cmp-cc/vue-cookies)
- [OpenAI API](https://platform.openai.com/docs/)
- [annyang](https://github.com/TalAter/annyang)
- [Bootstrap](https://getbootstrap.com/)
- [SVG Repo](https://www.svgrepo.com/)
- [Dark mode switch](https://codepen.io/mrozilla/pen/OJJNjRb)

## Features and roadmap

- [x] Command recognition vie VoiceRecognition API
- [x] Text generation via OpenAI API
- [x] Text-to-speech via OpenAI API Whisper
- [x] Settings
- [x] Dark mode and light mode switch
- [x] Plugins module
- [x] GPTPlugin for text generation
- [ ] Command recognition and execution for settings
- [ ] Markdown support for text generation
- [ ] Code support for text generation
- [ ] Spotify plugin
- [ ] DALL·E plugin
- [ ] Weather plugin

## How to create plugin

1. Create new file in `src/plugins` directory with name `PluginNamePlugin.vue`
2. Build your plugin as follows

    ``` vue
    <script setup lang="ts">
    import commandRecogizer from '../stores/commandRecogizer'
    import type { CommandOption } from 'annyang'
    import { storeToRefs } from 'pinia'

    const { output } = storeToRefs(commandRecogizer())
    const { recogizer } = commandRecogizer()

    const yourPluginAction = (question: string) => {
      recogizer.pause()
        console.log(question)
        output.value = 'Your plugin action'
      recogizer.resume()
    }

    const anotherPluginAction = ()) => {
      recogizer.pause()
        console.log('Another plugin action')
        output.value = 'Another plugin action'
      recogizer.resume()
    }

    const commands: CommandOption = {
      'tell me *question': yourPluginAction as any
      'another plugin action': anotherPluginAction as any
    }

    recogizer.addCommands(commands)
    </script>
    ```

    recpgozer is instance of [annyang](https://github.com/TalAter/annyang) if you want to know more about it, how commands works and how to write them, check out [annyang documentatio](https://github.com/TalAter/annyang/blob/master/docs/README.md).

3. Import this plugin in App.vue file and add it to template

    ``` vue
    <template>
      <LogoComp />
      <SettingsComp />
      <ThemeSwitcher />
      <div id="plugins">
        <GPTPlugin />
        <YourPlugin />
        ...
    </template>
    ```

## Project Setup

### Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
