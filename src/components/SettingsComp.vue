<script setup>
import { SettingsStore } from '@/stores/settings'
import { onMounted } from 'vue'

const store = SettingsStore()

onMounted(() => {
  store.load()
})
</script>

<template>
  <input type="text" id="openai-api-key" v-model="store.openaiApiKey" />
  <button @click="store.save">Save</button>
</template>
