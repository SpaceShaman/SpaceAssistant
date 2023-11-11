<script setup>
import SpeachToGPT from '../components/SpeachToGPT.vue'
</script>

<template>
  <header>
    <h1>
      <img class="logo" src="@/assets/logo.svg" width="50" height="50" />
      Voice Assistant
    </h1>
    <p>Click button below and say something...</p>
    <SpeachToGPT />
  </header>
</template>

<style scoped>
header {
  margin: 0 auto;
  display: block;
  align-items: center;
  text-align: center;
}
.logo {
  display: inline-block;
  vertical-align: middle;
}
</style>
