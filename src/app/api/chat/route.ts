import { GoogleGenerativeAI } from '@google/generative-ai'
import { StreamingTextResponse, Message as VercelChatMessage } from 'ai'
import { readFileSync } from 'fs'
import { join } from 'path'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export const runtime = 'edge'

const buildGeminiPrompt = (messages: VercelChatMessage[]) => {
  const systemPrompt = `
You are a helpful AI assistant that generates a single React component for a given prompt.
Do not import React, as it is already available in the scope.
Only output the code for the component, with no additional explanations.
  `
  return {
    system: systemPrompt,
    messages: messages.map((message) => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: message.content,
    })),
  }
}

export async function POST(req: Request) {
  const { messages } = await req.json()
  const { system, messages: geminiMessages } = buildGeminiPrompt(messages)
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-pro',
    generationConfig: {
      maxOutputTokens: 4096,
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    },
    systemInstruction: system,
  })

  const lastMessage = geminiMessages[geminiMessages.length - 1].parts
  const result = await model.generateContentStream(lastMessage)
  
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        controller.enqueue(chunk.text())
      }
      controller.close()
    },
  })

  return new StreamingTextResponse(stream)
}
