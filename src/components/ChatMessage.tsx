
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import SundayAvatar from "./SundayAvatar";
import { Gift, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface ChatMessageProps {
  sender: "user" | "sunday";
  text: string;
  timestamp: Date;
  type?: "question" | "suggestion" | "information";
  isTyping?: boolean;
}

export function ChatMessage({
  sender,
  text,
  timestamp,
  type = "information",
  isTyping = false
}: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  const [feedback, setFeedback] = useState<"liked" | "disliked" | null>(null);
  const [expanded, setExpanded] = useState(true);

  // Simplified styling logic using constants
  const isSunday = sender === "sunday";

  // Container alignment
  const containerStyles = cn("flex mb-4", isSunday ? "justify-start" : "justify-end");

  // Message bubble styling
  const typeStyles = {
    question: "bg-[#FFF4D4] border-gift-yellow",
    suggestion: "bg-[#FFF4D4] border-gift-yellow-light",
    information: "bg-[#FFF4D4] border-gift-yellow-lighter"
  };
  
  const bubbleStyles = cn(
    "max-w-[85%] relative rounded-2xl py-3 px-4 text-foreground", 
    isSunday 
      ? cn("rounded-bl-sm border-2", typeStyles[type]) 
      : "bg-white rounded-br-sm shadow-sm"
  );

  // Suggestion type icon check
  const showIcon = type === "suggestion" && isSunday;
  
  // Process structured content
  const formatStructuredContent = (content: string) => {
    // Handle gift recommendation formatting
    if (type === "suggestion" && isSunday) {
      const sections = content.split(/GIFT IDEAS:|PRESENTATION TIPS:|INSPIRATION:/gi);
      
      if (sections.length >= 3) {
        // We have structured content
        return (
          <div className="space-y-3">
            {content.includes("GIFT IDEAS:") && (
              <div>
                <h4 className="font-medium text-sm mb-1">Gift Ideas</h4>
                <div className="pl-1 text-sm">
                  {sections[1].trim().split('\n').map((line, i) => (
                    line.trim() && <p key={i} className="mb-1">{line}</p>
                  ))}
                </div>
              </div>
            )}
            
            {content.includes("PRESENTATION TIPS:") && (
              <div>
                <h4 className="font-medium text-sm mb-1">Presentation Tips</h4>
                <div className="pl-1 text-sm">
                  {sections[2].trim().split('\n').map((line, i) => (
                    line.trim() && <p key={i} className="mb-1">{line}</p>
                  ))}
                </div>
              </div>
            )}
            
            {content.includes("INSPIRATION:") && (
              <div>
                <h4 className="font-medium text-sm mb-1">Inspiration</h4>
                <div className="pl-1 text-sm">
                  {sections[3].trim().split('\n').map((line, i) => (
                    line.trim() && <p key={i} className="mb-1">{line}</p>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setFeedback("liked")}
                disabled={feedback === "liked"}
              >
                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                {feedback === "liked" ? "Liked" : "Like"}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setFeedback("disliked")}
                disabled={feedback === "disliked"}
              >
                <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                {feedback === "disliked" ? "Disliked" : "Dislike"}
              </Button>
            </div>
          </div>
        );
      }
    }
    
    // Default rendering for regular text
    return <div className="text-sm">{content}</div>;
  };

  return (
    <div className={containerStyles}>
      {isSunday && (
        <div className="mr-2 flex-shrink-0">
          <SundayAvatar size="sm" animated={true} />
        </div>
      )}
      
      <div className="flex flex-col">
        <div className={bubbleStyles}>
          {showIcon && (
            <div className="absolute -left-2 -top-2 bg-white rounded-full p-1 border border-gift-teal">
              <Gift size={16} className="text-gift-teal" />
            </div>
          )}
          
          {isTyping ? (
            <div className="flex space-x-1 items-center h-6 px-2">
              <div className="w-2 h-2 bg-gift-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gift-gray-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-gift-gray-400 rounded-full animate-pulse delay-200"></div>
            </div>
          ) : (
            formatStructuredContent(text)
          )}
        </div>
        
        <div className="text-xs text-muted-foreground mt-1 px-1">
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
}
