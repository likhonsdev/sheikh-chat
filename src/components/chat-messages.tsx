import { cn } from "@/lib/utils"

function ChatMessage({
  role,
  content,
}: {
  role: "user" | "assistant"
  content: string
}) {
  return (
    <div
      className={cn(
        "mb-4 flex items-start gap-4 rounded-lg px-4 py-2",
        role === "user" ? "bg-accent/10" : "bg-primary/10"
      )}
    >
      <div className="font-headline text-sm font-bold uppercase">
        {role === "user" ? "You" : "AI"}:
      </div>
      <div className="prose prose-sm dark:prose-invert">{content}</div>
    </div>
  )
}

export function ChatMessages({ messages }: { messages: { role: "user" | "assistant"; content: string }[] }) {
  return (
    <div className="space-y-4 px-4">
      {messages.map((message, i) => (
        <ChatMessage key={i} role={message.role} content={message.content} />
      ))}
    </div>
  )
}
