<script setup lang="ts">
import { SettingsStore } from '../stores/settings'
import generateText from '../utils/generateText'
import generateSpeech from '../utils/generateSpeech'
import commandRecogizer from '../stores/commandRecogizer'
import type { CommandOption } from 'annyang'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const { output } = storeToRefs(commandRecogizer())
const { recogizer } = commandRecogizer()
const { openaiApiKey, model, voice, startCommand } = storeToRefs(SettingsStore())

const askGPT = async (question: string) => {
  recogizer.pause()
  await generateText(openaiApiKey.value, model.value, question, output)
  await generateSpeech(openaiApiKey.value, voice.value, output.value)
  recogizer.resume()
}

onMounted(() => {
  console.log('Innit')
  const commands: CommandOption = {
    [`${startCommand.value} *question`]: askGPT as any
  }
  recogizer.addCommands(commands)
})
</script>
<template><div /></template>
