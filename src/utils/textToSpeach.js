export default async (text, openai) => {
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',
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
    console.log('Audio playback initiated.')
  } else {
    console.error('Error while retrieving audio data from OpenAI API.')
  }
}
