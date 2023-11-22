<script setup lang="ts">
import { onMounted } from 'vue'
import LogoComp from './components/LogoComp.vue'
import SettingsComp from './components/SettingsComp.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
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
  <SettingsComp />
  <ThemeSwitcher />
  <div id="plugins">
    <GPTPlugin />
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
