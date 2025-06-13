'use client'

import { ChatInput } from "@/components/chat-input"
import { ChatMessages } from "@/components/chat-messages"
import { useChat } from "ai/react"

export default function Home() {
  const { messages, handleSubmit, isLoading } = useChat()

  return (
    <main className="container mx-auto flex min-h-screen flex-col">
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

      <div className="flex-1 overflow-y-auto">
        {messages.length > 0 ? (
          <ChatMessages messages={messages} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-muted-foreground">
              Start a conversation with Sheikh Chat!
            </p>
          </div>
        )}
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
