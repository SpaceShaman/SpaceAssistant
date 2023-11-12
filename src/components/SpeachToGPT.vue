<script setup>
import OpenAI from 'openai'
import { ref } from 'vue'

const openaiApiKey = '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' // Replace with your OpenAI API key
const openai = new OpenAI({ apiKey: openaiApiKey, dangerouslyAllowBrowser: true })

const recording = ref(false)
const transciribing = ref(false)
const mediaRecorder = ref(null)
const audioChunks = ref([])
const transcription = ref('')
const textFromGPT = ref('')

function startRecording() {
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

function stopRecording() {
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

async function transcribeAudio() {
  if (audioChunks.value.length === 0) {
    return
  }

  // Create audio stream from audio chunks captured from the microphone input in wav format
  const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' })
  const audio = new File([audioBlob], 'audio.wav', { type: 'audio/wav' })

  transcription.value = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: audio,
    response_format: 'text'
  })

  console.log(transcription.value)
  generateText()
  transciribing.value = false
}

async function generateText() {
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: transcription.value }
    ],
    model: 'gpt-4'
  })

  textFromGPT.value = response.choices[0].message.content
  console.log(textFromGPT.value)

  transformTextToSpeech()
}

async function transformTextToSpeech() {
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'echo',
    input: textFromGPT.value
  })
  console.log('OpenAI API response:', response)

  if (response.ok) {
    // Retrieve audio data from the response body
    const audioData = await response.arrayBuffer()

    // Create a new Audio object
    const audio = new Audio()

    // Convert audio data to a Blob and set it as the source for the Audio object
    const blob = new Blob([audioData], { type: 'audio/wav' })
    const audioUrl = URL.createObjectURL(blob)
    audio.src = audioUrl

    // Play the audio
    audio.play()

    console.log('Audio playback initiated.')
  } else {
    console.error('Error while retrieving audio data from OpenAI API.')
  }
}
</script>

<template>
  <div v-if="!recording & !transciribing" @click.stop="startRecording" class="microphone rounded">
    <div class="microphone-inner rounded"></div>
  </div>
  <div v-if="recording & !transciribing" @click.stop="stopRecording" class="microphone">
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
