<script setup lang="ts">
import { onMounted } from 'vue'
import LogoComp from './components/LogoComp.vue'
import SettingsMenu from './components/SettingsMenu.vue'
import ThemePlugin from './plugins/ThemePlugin.vue'
import GPTPlugin from '@/plugins/GPTPlugin.vue'
import commandRecogizer from '@/stores/commandRecogizer'
import { storeToRefs } from 'pinia'

const { userInput, output } = storeToRefs(commandRecogizer())
const { setup } = commandRecogizer()

onMounted(() => {
  setup()
})
</script>

<template>
  <LogoComp />
  <SettingsMenu />
  <div id="plugins">
    <GPTPlugin />
    <ThemePlugin />
  </div>
  <p id="user-input">
    {{ userInput }}
  </p>
  <p id="output">
    {{ output }}
  </p>
</template>

<style>
#app {
  margin: 0 auto;
  align-items: center;
  text-align: center;
  user-select: none;
}
body {
  display: flex;
  place-items: center;
  min-height: 100vh;
}
</style>
