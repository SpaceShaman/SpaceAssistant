import { OpenAI } from 'openai'
import { Models } from '../stores/settings'

export default async (promt: string, openai: OpenAI, model:Models = Models.gpt3trubo): Promise<string> => {
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: promt }
    ],
    model: model,
  })
  if (!response.choices[0].message.content) {
    throw new Error('No response from OpenAI text generation')
  }
  return response.choices[0].message.content
}
