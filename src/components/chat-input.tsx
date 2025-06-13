import { SendHorizontal } from "lucide-react"
import { FormEvent, useRef } from "react"

export function ChatInput({ onSubmit }: { onSubmit: (value: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!inputRef.current) return

    const value = inputRef.current.value
    if (!value) return

    onSubmit(value)
    inputRef.current.value = ""
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
      <input
        ref={inputRef}
        placeholder="Type your message..."
        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <SendHorizontal className="h-4 w-4" />
      </button>
    </form>
  )
}
