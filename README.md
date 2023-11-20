# Space Assistant

Voice assistant built with [Vue.js](https://vuejs.org/) and [OpenAI API](https://platform.openai.com/docs/).
It works according to the following scheme: Audio from microphone -> StT -> GPT4 -> TtS

You cen check it out [here](https://spaceshaman.github.io/space-assistant/)

## Dependencies

- [Vue.js](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org)
- [vue-cookies](https://github.com/cmp-cc/vue-cookies)
- [OpenAI API](https://platform.openai.com/docs/)
- [Bootstrap](https://getbootstrap.com/)
- [SVG Repo](https://www.svgrepo.com/)
- [Dark mode switch](https://codepen.io/mrozilla/pen/OJJNjRb)

## Features and roadmap

- [x] Speech-to-text via OpenAI API Wisper
- [x] Text generation via OpenAI API GPT-3 or GPT-4
- [x] Text-to-speech via OpenAI API Wisper
- [x] Command recognition and execution for start and stop listening
- [x] Settings
- [x] Dark mode and light mode switch
- [ ] Command recognition and execution for settings
- [ ] Markdown support for text generation
- [ ] Code support for text generation
- [ ] Plugins module
- [ ] Spotify plugin
- [ ] DALL·E plugin
- [ ] Weather plugin

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
