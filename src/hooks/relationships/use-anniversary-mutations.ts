
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Anniversary } from './types';

export function useAnniversaryMutations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createAnniversary = useMutation({
    mutationFn: async (newAnniversary: Omit<Anniversary, 'id' | 'date_added'>) => {
      const { data, error } = await supabase
        .from('anniversaries')
        .insert([newAnniversary])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anniversaries', data.relationship_id] });
      toast({
        title: "Success",
        description: "Important date added successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to add important date: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateAnniversary = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<Anniversary>) => {
      const { data, error } = await supabase
        .from('anniversaries')
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
      queryClient.invalidateQueries({ queryKey: ['anniversaries', data.relationship_id] });
      toast({
        title: "Success",
        description: "Important date updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update important date: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteAnniversary = useMutation({
    mutationFn: async ({ id, relationshipId }: { id: string, relationshipId: string }) => {
      const { error } = await supabase
        .from('anniversaries')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return { id, relationshipId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anniversaries', data.relationshipId] });
      toast({
        title: "Success",
        description: "Important date deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to delete important date: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    createAnniversary,
    updateAnniversary,
    deleteAnniversary
  };
}
