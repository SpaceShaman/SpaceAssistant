import OpenAI from 'openai'
import { Models } from '../stores/settings'
import type { Ref } from 'vue'

export default async (apiKey: string, model: Models = Models.gpt3trubo, promt: string, output: Ref<string>) => {
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true })
  output.value = ''
  const completion = await openai.chat.completions.create({
    model: model,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: promt }
    ],
    stream: true
  })

  for await (const chunk of completion) {
    if (!chunk.choices[0].finish_reason) {
      output.value += chunk.choices[0].delta.content
    }
  }
}
