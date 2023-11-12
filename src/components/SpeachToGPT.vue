<script setup>
import OpenAI from 'openai'
import { ref } from 'vue'
import AudioRecorder from '../utils/audioRecorder'
import generateText from '../utils/generateText'
import textToSpeach from '../utils/textToSpeach'
import transcribeAudio from '../utils/transcribeAudio'

const openaiApiKey = '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' // Replace with your OpenAI API key
const openai = new OpenAI({ apiKey: openaiApiKey, dangerouslyAllowBrowser: true })

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
  transcription.value = await transcribeAudio(audio, openai)
  textFromGPT.value = await generateText(transcription.value, openai)
  await textToSpeach(textFromGPT.value, openai)
  transciribing.value = false
}
</script>

<template>
  <div v-if="!recording & !transciribing" @click.stop="start" class="microphone rounded">
    <div class="microphone-inner rounded"></div>
  </div>
  <div v-if="recording & !transciribing" @click.stop="stop" class="microphone">
    <div class="microphone-inner"></div>
  </div>
  <p v-if="transcription">{{ transcription }}</p>
  <p v-if="textFromGPT">{{ textFromGPT }}</p>
</template>

<style scoped>
p {
  margin: 0 auto;
}
.microphone {
  display: block;
  margin: 0 auto;
  width: 70px;
  height: 70px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.4rem;
  cursor: pointer;
  border-radius: 0.3rem;
  background-color: var(--vt-c-text-dark-2);
}
.microphone-inner {
  width: 100%;
  height: 100%;
  border-radius: 0.3rem;
  background-color: var(--vt-c-text-dark-1);
}
.rounded {
  border-radius: 50%;
}
.microphone:hover {
  opacity: 0.8;
}
.microphone:active {
  opacity: 0.6;
}
</style>
