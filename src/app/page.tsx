'use client'

import { useState } from 'react'
import { ChatInput } from "@/components/chat-input"
import { CodeEditor } from "@/components/code-editor"
import { CodePreview } from "@/components/code-preview"
import { useChat } from "ai/react"

export default function Home() {
  const [code, setCode] = useState('')
  const { messages, handleSubmit, isLoading } = useChat({
    onFinish: (message) => {
      const codeBlock = message.content.match(/```(?:tsx|jsx)\n([\s\S]*?)```/);
      if (codeBlock) {
        setCode(codeBlock[1]);
      }
    }
  })

  return (
    <main className="container mx-auto grid h-screen grid-rows-[auto,1fr,auto] gap-4">
      <header className="sticky top-0 bg-background/80 backdrop-blur">
        <div className="border-b py-4">
          <h1 className="font-headline text-center text-2xl font-bold">
            Sheikh Chat
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Powered by Google Gemini
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-md border">
          <CodeEditor
            initialCode={code}
            onChange={setCode}
            language="typescript"
          />
        </div>
        <div className="rounded-md border">
          <CodePreview code={code} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-background">
        <ChatInput
          onSubmit={(value) => {
            handleSubmit(new Event('submit') as any, { data: value })
          }}
        />
      </div>
    </main>
  )
}
