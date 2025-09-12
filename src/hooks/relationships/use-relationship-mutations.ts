
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Relationship, Anniversary } from './types';

export function useRelationshipMutations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  type NewRelationship = Omit<Relationship, 'id' | 'user_id' | 'date_added' | 'last_updated' | 'status' | 'initials'>;

  const createRelationship = useMutation({
    mutationFn: async (newRelationship: NewRelationship) => {
      if (!user) {
        throw new Error("User must be logged in to create a relationship");
      }

      // Ensure relationship_type matches the expected enum values in Supabase
      const { data, error } = await supabase
        .from('relationships')
        .insert({
          ...newRelationship,
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationships'] });
      toast({
        title: "Success",
        description: "Relationship created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to create relationship: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateRelationship = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<Relationship>) => {
      const { data, error } = await supabase
        .from('relationships')
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
      queryClient.invalidateQueries({ queryKey: ['relationships'] });
      queryClient.invalidateQueries({ queryKey: ['relationship', data.id] });
      toast({
        title: "Success",
        description: "Relationship updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update relationship: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteRelationship = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('relationships')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationships'] });
      toast({
        title: "Success",
        description: "Relationship deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to delete relationship: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    createRelationship,
    updateRelationship,
    deleteRelationship
  };
}
