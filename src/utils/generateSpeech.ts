import { Voices } from '@/stores/settings'
import { OpenAI } from 'openai'


export default async (apiKey: string, voice: Voices = Voices.alloy, text: string) => {
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true })
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: voice,
    input: text,
    response_format: 'aac'
  })

  if (response.ok) {
    // Create a new MediaSource object
    const mediaSource = new MediaSource();
    const audio = new Audio();
    audio.src = URL.createObjectURL(mediaSource);
    audio.play();

    mediaSource.addEventListener('sourceopen', () => {
      const sourceBuffer = mediaSource.addSourceBuffer('audio/aac');

      // Read and play the audio data chunk by chunk
      const reader = response.body!.getReader(); 
      const readChunk = async () => {
        const { value, done } = await reader.read();
        if (done) {
          mediaSource.endOfStream();
        } else {
          sourceBuffer.appendBuffer(value);
          console.log('appended buffer');
          await new Promise(resolve => sourceBuffer.addEventListener('updateend', resolve, { once: true }));
          readChunk();
        }
      };
      readChunk();
    });
  } else {
    throw new Error('No response from OpenAI text to speech')
  }
}