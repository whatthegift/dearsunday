import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full animate-in slide-in-from-bottom-2 duration-300",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
          isUser
            ? "bg-chat-user-bg text-chat-user-text rounded-br-md"
            : "bg-chat-ai-bg text-chat-ai-text rounded-bl-md"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message}</p>
        {timestamp && (
          <p className="mt-1 text-xs opacity-70">{timestamp}</p>
        )}
      </div>
    </div>
  );
}