import { OpenAI, } from 'openai';

export default async (audio: File, openai: OpenAI): Promise<string> => {
  const transcription = await openai.audio.transcriptions.create({
      model: 'whisper-1',
      file: audio,
      response_format: 'text'
    })
  return transcription as unknown as string
}
