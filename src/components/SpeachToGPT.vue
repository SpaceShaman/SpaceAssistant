<script setup>
import axios from 'axios'
import { ref } from 'vue'

const openaiApiKey = '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' // Replace with your OpenAI API key
const openaiModel = 'whisper-1' // Replace with the OpenAI model you want to use

const recording = ref(false)
const transciribing = ref(false)
const mediaRecorder = ref(null)
const audioChunks = ref([])
const treanscription = ref('')

const startRecording = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorder.value = new MediaRecorder(stream)

      mediaRecorder.value.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.value.push(event.data)
        }
      }

      mediaRecorder.value.onstop = () => {
        recording.value = false
      }

      mediaRecorder.value.start()
      recording.value = true
    })
    .catch((error) => console.error('Error accessing the microphone:', error))
}

const stopRecording = () => {
  transciribing.value = true
  recording.value = false
  if (mediaRecorder.value) {
    mediaRecorder.value.stop()
    // wait for the recorder to finish before attempting to transcribe
    mediaRecorder.value.onstop = () => {
      console.log('Stopped recording and attempting to transcribe...')
      transcribeAudio()
      audioChunks.value = []
    }
  }
}

const transcribeAudio = () => {
  if (audioChunks.value.length === 0) {
    return
  }

  const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' })

  const formData = new FormData()
  formData.append('file', audioBlob, 'audio.wav')
  formData.append('model', openaiModel)

  // Send audio to the OpenAI Speech-to-Text API
  axios
    .post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log('Transcription from OpenAI:', response.data)
      treanscription.value = response.data.text
      transciribing.value = false
      // Handle transcription results here
    })
    .catch((error) => {
      console.error('Error during transcription from OpenAI:', error)
    })
}
</script>

<template>
  <div v-if="!recording & !transciribing" @click="startRecording" class="microphone rounded">
    <div class="microphone-inner rounded"></div>
  </div>
  <div v-if="recording & !transciribing" @click="stopRecording" class="microphone">
    <div class="microphone-inner"></div>
  </div>
  <p v-if="treanscription">{{ treanscription }}</p>
</template>

<style scoped>
p {
  margin: 0 auto;
}
.microphone {
  display: block;
  margin: 0 auto;
  width: 60px;
  height: 60px;
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
