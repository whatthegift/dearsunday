
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Smile, Gift as GiftIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

// Sample emojis for the emoji picker
const emojis = ["❤️", "🎁", "🎂", "🎉", "🎊", "🎈", "🎄", "🎀", "👨‍👩‍👧‍👦", "👨‍👨‍👧‍👦", "👩‍👩‍👧‍👦", "👪", "👨‍👩‍👧", "🐱", "🐶", "🌹", "💐", "🌺", "🌸", "🌼", "💯", "💭", "🤔", "😊", "😍", "🙏", "👍", "👏"];

// Sample gift preferences
const giftPreferences = [
  { id: 1, name: "Price Range", options: ["Under $25", "$25-$50", "$50-$100", "$100-$200", "$200+"] },
  { id: 2, name: "Occasion", options: ["Birthday", "Anniversary", "Wedding", "Graduation", "Holiday", "Just Because"] },
  { id: 3, name: "Interests", options: ["Cooking", "Reading", "Gardening", "Technology", "Sports", "Art", "Music"] }
];

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    onSendMessage(inputValue);
    setInputValue("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const insertEmoji = (emoji: string) => {
    setInputValue(prev => prev + emoji);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="flex items-center gap-2">
        <Input 
          placeholder="💭 Who's on your mind today?" 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          onKeyDown={handleKeyDown} 
          className="flex-1 py-6 px-4 border-gift-yellow-lighter focus-visible:ring-gift-yellow-light" 
        />
        <Button onClick={handleSendMessage} size="icon" className="h-12 w-12 rounded-full">
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex justify-between mt-2 px-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              <Smile className="h-4 w-4 mr-1" />
              Add emoji
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="grid grid-cols-8 gap-1">
              {emojis.map((emoji, index) => (
                <Button 
                  key={index} 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => insertEmoji(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              <GiftIcon className="h-4 w-4 mr-1" />
              Gift preferences
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4">
            <h3 className="font-semibold mb-2 text-sm">Gift Preferences</h3>
            <div className="space-y-3">
              {giftPreferences.map(pref => (
                <div key={pref.id}>
                  <h4 className="text-xs font-medium mb-1">{pref.name}</h4>
                  <div className="flex flex-wrap gap-1">
                    {pref.options.map((option, idx) => (
                      <Button 
                        key={idx} 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-6 rounded-full"
                        onClick={() => setInputValue(prev => prev + ` Looking for ${option.toLowerCase()} gifts`)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
