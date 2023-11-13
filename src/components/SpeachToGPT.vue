<script setup>
import { SettingsStore } from '@/stores/settings'
import OpenAI from 'openai'
import { onMounted, ref } from 'vue'
import AudioRecorder from '../utils/audioRecorder'
import generateText from '../utils/generateText'
import textToSpeach from '../utils/textToSpeach'
import transcribeAudio from '../utils/transcribeAudio'

const store = SettingsStore()

const openai = ref(null)
onMounted(() => {
  store.load()
  openai.value = new OpenAI({ apiKey: store.openaiApiKey, dangerouslyAllowBrowser: true })
})

const recorder = new AudioRecorder()
const recording = ref(false)
const transciribing = ref(false)
const transcription = ref('')
const textFromGPT = ref('')

const start = () => {
  recording.value = true
  recorder.startRecording()
}

const stop = async () => {
  const audio = await recorder.stopRecording()
  recording.value = false
  transciribing.value = true
  transcription.value = await transcribeAudio(audio, openai.value)
  textFromGPT.value = await generateText(transcription.value, openai.value)
  await textToSpeach(textFromGPT.value, openai.value)
  transciribing.value = false
}
</script>

<template>
  <div v-if="!recording & !transciribing" @click.stop="start" class="microphone microphone-rounded">
    <div class="microphone-inner microphone-rounded"></div>
  </div>
  <div v-if="recording & !transciribing" @click.stop="stop" class="microphone">
    <div class="microphone-inner"></div>
  </div>
  <p v-if="transcription">{{ transcription }}</p>
  <p v-if="textFromGPT">{{ textFromGPT }}</p>
</template>

<style scoped>
p {
  margin-bottom: 0.5rem;
}
.microphone {
  --size: 4rem;
  margin: 0 auto;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  width: var(--size);
  height: var(--size);
  padding: 0.4rem;
  cursor: pointer;
  background-color: var(--bs-body-color);
}
.microphone-inner {
  width: 100%;
  height: 100%;
  border-radius: 0.3rem;
  background-color: var(--bs-border-color);
}
.microphone-rounded {
  border-radius: 50%;
}
.microphone:hover {
  opacity: 0.8;
}
.microphone:active {
  opacity: 0.6;
}
</style>
