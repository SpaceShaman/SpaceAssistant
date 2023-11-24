import { Voices } from '@/stores/settings'
import { OpenAI } from 'openai'
  
export default async (apiKey: string, voice: Voices = Voices.alloy, text: string) => {
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true })
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: voice,
    input: text
  })
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
  } else {
    throw new Error('No response from OpenAI text to speach')
  }
}
