export default async (audio, openai) => {
  return await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: audio,
    response_format: 'text'
  })
}
