<script setup lang="ts">
import OpenAI from 'openai'
import { SettingsStore } from '../stores/settings'
import generateText from '../utils/generateText'
import textToSpeach from '../utils/textToSpeach'
import commandRecogizer from '../stores/commandRecogizer'
import type { CommandOption } from 'annyang'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const { output } = storeToRefs(commandRecogizer())
const { recogizer } = commandRecogizer()
const { openaiApiKey, model, voice, startCommand } = storeToRefs(SettingsStore())

const askGPT = async (question: string) => {
  recogizer.pause()
  const openai = new OpenAI({ apiKey: openaiApiKey.value, dangerouslyAllowBrowser: true })
  output.value = await generateText(question, openai, model.value)
  await textToSpeach(output.value, openai, voice.value)
  recogizer.resume()
}

onMounted(() => {
  const commands: CommandOption = {
    [`${startCommand.value} *question`]: askGPT as any
  }
  recogizer.addCommands(commands)
})
</script>
<template>
  <div />
</template>
