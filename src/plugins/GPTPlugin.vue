<script setup lang="ts">
import OpenAI from 'openai'
import { SettingsStore } from '../stores/settings'
import generateText from '../utils/generateText'
import textToSpeach from '../utils/textToSpeach'
import commandRecogizer from '../stores/commandRecogizer'
import type { CommandOption } from 'annyang'
import { storeToRefs } from 'pinia'

const { output } = storeToRefs(commandRecogizer())
const { recogizer } = commandRecogizer()

const askGPT = async (question: string) => {
  recogizer.pause()
  const { openaiApiKey, model, voice } = SettingsStore()
  const openai = new OpenAI({ apiKey: openaiApiKey, dangerouslyAllowBrowser: true })
  output.value = await generateText(question, openai, model)
  await textToSpeach(output.value, openai, voice)
  recogizer.resume()
}

const commands: CommandOption = {
  'tell me *tag': askGPT as any
}

recogizer.addCommands(commands)
</script>
<template><div /></template>
