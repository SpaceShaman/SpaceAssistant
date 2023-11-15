import { OpenAI } from 'openai'
export default async (promt: string, openai: OpenAI): Promise<string> => {
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: promt }
    ],
    model: 'gpt-3.5-turbo'
  })
  if (!response.choices[0].message.content) {
    throw new Error('No response from OpenAI text generation')
  }
  return response.choices[0].message.content
}
