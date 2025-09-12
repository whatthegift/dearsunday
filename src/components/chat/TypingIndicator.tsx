export function TypingIndicator() {
  return (
    <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-chat-ai-bg rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
}