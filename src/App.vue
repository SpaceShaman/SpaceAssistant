<script setup lang="ts">
import LogoComp from './components/LogoComp.vue'
import SettingsComp from './components/SettingsComp.vue'
import SpeachToGPT from './components/SpeachToGPT.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
</script>

<template>
  <LogoComp />
  <SpeachToGPT />
  <SettingsComp />
  <ThemeSwitch />
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
