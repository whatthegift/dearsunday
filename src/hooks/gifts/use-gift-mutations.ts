
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Gift, NewGift } from './types';

export function useGiftMutations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const createGift = useMutation({
    mutationFn: async (newGift: NewGift) => {
      if (!user) {
        throw new Error("User must be logged in to add a gift");
      }

      const { data, error } = await supabase
        .from('gifts')
        .insert([{
          name: newGift.name,
          price: newGift.price,
          date_given: newGift.date_given,
          occasion: newGift.occasion,
          description: newGift.description,
          user_id: user.id,
          recipient_id: newGift.recipient_id
        }])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['gifts'] });
      queryClient.invalidateQueries({ queryKey: ['gifts', data.recipient_id] });
      toast({
        title: "Success",
        description: "Gift added successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to add gift: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateGift = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<Gift>) => {
      const { data, error } = await supabase
        .from('gifts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['gifts'] });
      queryClient.invalidateQueries({ queryKey: ['gifts', data.recipient_id] });
      toast({
        title: "Success",
        description: "Gift updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update gift: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteGift = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('gifts')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gifts'] });
      toast({
        title: "Success",
        description: "Gift deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to delete gift: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    createGift,
    updateGift,
    deleteGift,
  };
}
