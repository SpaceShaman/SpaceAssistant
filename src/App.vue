<script setup lang="ts">
import SettingsComp from './components/SettingsComp.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
import AssistantView from './views/AssistantView.vue'
</script>

<template>
  <AssistantView />
  <ThemeSwitch />
  <SettingsComp />
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
