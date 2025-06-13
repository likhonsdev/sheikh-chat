import { GoogleGenerativeAI } from '@google/generative-ai'
import { StreamingTextResponse, Message as VercelChatMessage } from 'ai'
import { readFileSync } from 'fs'
import { join } from 'path'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export const runtime = 'edge'

const buildGeminiPrompt = (messages: VercelChatMessage[]) => {
  const systemPrompt = readFileSync(join(process.cwd(), 'system-prompt.md'), 'utf-8')
  return messages.map((message) => ({
    role: message.role === 'user' ? 'user' : 'model',
    parts: message.content,
  }))
}

export async function POST(req: Request) {
  const { messages } = await req.json()
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-pro',
    generationConfig: {
      maxOutputTokens: 4096,
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    },
  })

  const geminiMessages = buildGeminiPrompt(messages)
  const chat = model.startChat({
    history: geminiMessages.slice(0, -1),
    generationConfig: {
      maxOutputTokens: 4096,
    },
  })

  const lastMessage = messages[messages.length - 1].content
  const result = await chat.sendMessageStream(lastMessage)
  
  // Create a TransformStream for converting the chunks
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  
  let counter = 0
  const stream = new TransformStream({
    async transform(chunk, controller) {
      const text = chunk.text()
      if (counter < 1) {
        // First chunk
        controller.enqueue(encoder.encode('data: ' + JSON.stringify({ role: 'assistant', content: text }) + '\n\n'))
      } else {
        // Subsequent chunks
        controller.enqueue(encoder.encode('data: ' + JSON.stringify({ content: text }) + '\n\n'))
      }
      counter++
    },
    flush(controller) {
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
    }
  })

  return new Response(result.stream().pipeThrough(stream), {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
