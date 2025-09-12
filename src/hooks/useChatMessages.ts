import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Message {
  id: number;
  sender: "user" | "sunday";
  text: string;
  timestamp: Date;
  type?: "question" | "suggestion" | "information";
}

// Store chats in memory (would be replaced with database persistence in a real app)
const chatStore: Record<string, Message[]> = {};

export function useChatMessages() {
  const [currentPersonId, setCurrentPersonId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showGiftRecommendations, setShowGiftRecommendations] = useState(false);
  const { user } = useAuth();

  // Load a specific person's chat
  const loadPersonChat = (personId: string) => {
    setCurrentPersonId(personId);
    
    // If we have stored messages for this person, load them
    if (chatStore[personId]) {
      setMessages(chatStore[personId]);
    } else {
      // Otherwise, start with an empty chat
      chatStore[personId] = [];
      setMessages([]);
    }
  };

  // Save messages for the current person
  const saveMessages = (newMessages: Message[]) => {
    if (currentPersonId) {
      chatStore[currentPersonId] = newMessages;
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!currentPersonId) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    
    // Simulate Sunday typing
    setIsTyping(true);
    
    try {
      // Prepare context from the last few messages
      const contextMessages = messages.slice(-5); // Get last 5 messages for context
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("sunday-chat", {
        body: {
          message: text,
          context: contextMessages,
          recipientDetails: {
            name: currentPersonId, // Currently just using the ID as the name since we don't have profile data here
          }
        }
      });

      if (error) {
        throw new Error(`Error calling Sunday chat function: ${error.message}`);
      }
      
      const responseType = data.type || "information";
      const responseText = data.text || getSundayResponse(text);
      
      const sundayMessage: Message = {
        id: Date.now(),
        sender: "sunday",
        text: responseText,
        timestamp: new Date(),
        type: responseType
      };
      
      const newMessages = [...updatedMessages, sundayMessage];
      setMessages(newMessages);
      saveMessages(newMessages);
      
      // If this was a gift suggestion, show the gift recommendations
      setShowGiftRecommendations(responseType === "suggestion");
      
    } catch (error) {
      console.error("Error sending message to Sunday:", error);
      // Fallback to the default response
      const sundayMessage: Message = {
        id: Date.now(),
        sender: "sunday",
        text: "I'm having trouble connecting right now. Let me try to help anyway: " + getSundayResponse(text),
        timestamp: new Date(),
        type: "information"
      };
      
      const newMessages = [...updatedMessages, sundayMessage];
      setMessages(newMessages);
      saveMessages(newMessages);
    } finally {
      setIsTyping(false);
    }
  };
  
  // Helper function to generate Sunday's responses as a fallback
  const getSundayResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes("birthday")) {
      return "Birthdays are special! What kind of things do they enjoy? Are they into any hobbies or collections?";
    } else if (lowerCaseMessage.includes("anniversary")) {
      return "Anniversaries call for meaningful gifts. How many years are you celebrating? Traditional anniversary gifts follow themes by year - would you like some suggestions based on that?";
    } else if (lowerCaseMessage.includes("christmas") || lowerCaseMessage.includes("holiday")) {
      return "The holidays are a wonderful time for thoughtful gifts! Are you looking for something practical, sentimental, or maybe an experience you can enjoy together?";
    } else if (lowerCaseMessage.includes("budget")) {
      return "It's smart to set a budget! What price range are you thinking of? I can suggest options at different price points.";
    } else if (lowerCaseMessage.includes("hobby") || lowerCaseMessage.includes("interest")) {
      return "Gifts related to someone's hobbies show you really know them! What specific activities or interests do they enjoy?";
    } else {
      return "That's interesting! Tell me more about what they like or what occasion you're shopping for, and I can help you find the perfect gift.";
    }
  };

  return {
    messages,
    isTyping,
    showGiftRecommendations,
    handleSendMessage,
    loadPersonChat
  };
}
