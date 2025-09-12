import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/ChatMessage";
import { GiftRecommendationCarousel } from "@/components/GiftRecommendationCarousel";
import { ChatInput } from "./ChatInput";
import { X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Relationship } from "@/hooks/use-relationships";

interface Message {
  id: number;
  sender: "user" | "sunday";
  text: string;
  timestamp: Date;
  type?: "question" | "suggestion" | "information";
}

interface GiftRecommendation {
  id: string;
  title: string;
  price: string;
  image?: string;
}

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
  showGiftRecommendations: boolean;
  giftRecommendations: GiftRecommendation[];
  onSendMessage: (message: string) => void;
  selectedPerson: Relationship;
}

export function ChatContainer({
  messages,
  isTyping,
  showGiftRecommendations,
  giftRecommendations,
  onSendMessage,
  selectedPerson
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const getPersonAvatar = () => {
    if (selectedPerson.profile_image) {
      return selectedPerson.profile_image;
    }
    return selectedPerson.initials || selectedPerson.name.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="flex-1 flex flex-col overflow-hidden border-gift-yellow-lighter">
      <div className="px-4 py-3 border-b border-gift-yellow-lighter flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
            {getPersonAvatar()}
          </div>
          <h2 className="font-semibold">{selectedPerson.name}</h2>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>
      
      {showBanner && (
        <div className="p-4 bg-[#FFF4D4] border-b border-gift-yellow-lighter flex justify-between items-center">
          <p className="text-sm">Let's talk about gift ideas for {selectedPerson.name}!</p>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6"
            onClick={() => setShowBanner(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden relative pb-16">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <ChatMessage 
                sender="sunday" 
                text={`Hi there! I'm Sunday, your gifting assistant. Let's talk about gift ideas for ${selectedPerson.name}. What's the occasion, or is there something specific you're looking for?`} 
                timestamp={new Date()} 
                type="information" 
              />
            ) : (
              messages.map((message, index) => (
                <div key={message.id}>
                  <ChatMessage 
                    sender={message.sender} 
                    text={message.text} 
                    timestamp={message.timestamp} 
                    type={message.type} 
                  />
                  
                  {showGiftRecommendations && 
                   index === messages.length - 1 && 
                   message.sender === "sunday" && 
                   message.type === "suggestion" && (
                    <GiftRecommendationCarousel recommendations={giftRecommendations} />
                  )}
                </div>
              ))
            )}
            
            {isTyping && (
              <ChatMessage 
                sender="sunday" 
                text="" 
                timestamp={new Date()} 
                isTyping={true} 
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </Card>
  );
}
