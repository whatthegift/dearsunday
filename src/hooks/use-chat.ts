
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/contexts/AuthContext';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sunday';
  text: string;
  timestamp: Date;
}

export interface UseChat {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
}

export const useChat = (conversationId?: string): UseChat => {
  const queryClient = useQueryClient();
  const [localConversationId, setLocalConversationId] = useState<string>(conversationId || '');
  const { user } = useAuth();

  // Function to create a new conversation or get existing one
  const initializeConversation = async () => {
    if (conversationId) return conversationId;
    
    if (!user) {
      console.error('No user logged in to create conversation');
      return '';
    }
    
    // Create a new conversation
    const { data, error } = await supabase
      .from('conversations')
      .insert([
        { 
          title: 'Chat with Sunday',
          user_id: user.id 
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      return '';
    }

    setLocalConversationId(data.id);
    return data.id;
  };

  // Query to fetch messages for the current conversation
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', localConversationId],
    queryFn: async () => {
      // If no conversation ID yet, initialize one
      const convId = localConversationId || await initializeConversation();
      
      if (!convId) return [];

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }

      return data.map((msg: any) => ({
        id: msg.id,
        sender: msg.sender,
        text: msg.content,
        timestamp: new Date(msg.timestamp)
      }));
    },
    enabled: !!localConversationId || (!!user && !conversationId)
  });

  // Mutation to send a new message
  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      const convId = localConversationId || await initializeConversation();
      
      if (!convId) throw new Error('Could not initialize conversation');

      // Insert user message
      const { error: userMsgError } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: convId,
            sender: 'user',
            content: text
          }
        ]);

      if (userMsgError) throw userMsgError;

      // Update last message time
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', convId);

      // Simulate Sunday's response (in a real app, this would likely be an API call to your AI service)
      setTimeout(async () => {
        const response = `I'd be happy to help you with that! Let me think about some thoughtful gift ideas based on what you've told me.`;
        
        const { error: sundayMsgError } = await supabase
          .from('messages')
          .insert([
            {
              conversation_id: convId,
              sender: 'sunday',
              content: response
            }
          ]);

        if (sundayMsgError) {
          console.error('Error sending Sunday response:', sundayMsgError);
        }

        queryClient.invalidateQueries({ queryKey: ['messages', convId] });
      }, 1000);

      return text;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', localConversationId] });
    }
  });

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    await sendMessageMutation.mutateAsync(text);
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
};
