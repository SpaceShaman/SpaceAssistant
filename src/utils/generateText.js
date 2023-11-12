export default async (promt, openai) => {
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: promt }
    ],
    model: 'gpt-4'
  })
  return response.choices[0].message.content
}
