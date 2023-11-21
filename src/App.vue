<script setup lang="ts">
import LogoComp from './components/LogoComp.vue'
import SettingsComp from './components/SettingsComp.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import VoiceAssistant from './components/VoiceAssistant.vue'
</script>

<template>
  <SettingsComp />
  <LogoComp />
  <VoiceAssistant />
  <ThemeSwitcher />
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
