
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendHorizonal, Loader2, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SundayAvatar from "./SundayAvatar";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useAuth } from "@/contexts/AuthContext";
import { ChatMessage } from "@/components/ChatMessage";
import { GiftRecommendationCarousel } from "@/components/GiftRecommendationCarousel";
import { useGiftRecommendations } from "@/hooks/useGiftRecommendations";
import { useToast } from "@/hooks/use-toast";

export default function SundayChat() {
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // We'll use a fixed ID for the dashboard chat
  const DASHBOARD_CHAT_ID = "dashboard-chat";
  
  const {
    messages,
    isTyping,
    showGiftRecommendations,
    handleSendMessage,
    loadPersonChat
  } = useChatMessages();
  
  const { giftRecommendations } = useGiftRecommendations();
  
  // Load the dashboard chat when the component mounts
  useEffect(() => {
    if (user) {
      loadPersonChat(DASHBOARD_CHAT_ID);
    }
  }, [user]);

  const handleSendMessageClick = async () => {
    if (inputValue.trim() === "") return;
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to chat with Sunday",
        variant: "destructive"
      });
      return;
    }
    
    await handleSendMessage(inputValue);
    setInputValue("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessageClick();
    }
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  if (!user) {
    return (
      <Card className="flex flex-col h-[400px]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <SundayAvatar size="sm" animated={true} />
            <span>Chat with Sunday</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Please sign in to chat with Sunday</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="flex flex-col h-[400px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <SundayAvatar size="sm" animated={true} />
          <span className="text-sm text-left font-medium">Dear Sunday</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto h-8 flex items-center text-xs"
            asChild
          >
            <a href="/chat">
              Full chat <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 mb-4 pr-2" ref={scrollAreaRef}>
          {isTyping ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4 p-1">
              {messages.length === 0 ? (
                <ChatMessage
                  sender="sunday"
                  text="Hi there! I'm Sunday, your gifting assistant. How can I help you today? I can suggest gift ideas, remind you of upcoming occasions, or help you find the perfect gift for someone special."
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
            </div>
          )}
        </ScrollArea>
        <div className="flex items-center gap-2">
          <Input 
            placeholder="💭 Ask Sunday for gift ideas..." 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            onKeyDown={handleKeyDown} 
            className="flex-1" 
            disabled={isTyping} 
          />
          <Button 
            size="icon" 
            onClick={handleSendMessageClick} 
            disabled={isTyping || !inputValue.trim()}
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
