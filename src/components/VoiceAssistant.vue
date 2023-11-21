<script setup lang="ts">
import GPTPlugin from '@/plugins/GPTPlugin'
import commandRecogizer from '@/utils/commandRecogizer'
import { onMounted, ref } from 'vue'

const userInput = ref<string>('')

onMounted(() => {
  const recogizer = commandRecogizer(GPTPlugin.commands)
  recogizer.addCallback('result', (userSaid) => {
    if (userSaid) userInput.value = userSaid[0]
  })
})
</script>

<template>
  <div id="user-input">{{ userInput }}</div>
  <div id="plugins">{{ GPTPlugin.output }}</div>
</template>

<style scoped></style>
