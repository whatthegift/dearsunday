
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Relationship, Anniversary } from './types';

// These functions are outside the hook to avoid recreation on each render
const fetchRelationships = async (userId: string | undefined): Promise<Relationship[]> => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from('relationships')
    .select('*')
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

const fetchRelationship = async (id: string): Promise<Relationship> => {
  const { data, error } = await supabase
    .from('relationships')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const fetchRelationshipAnniversaries = async (relationshipId: string): Promise<Anniversary[]> => {
  const { data, error } = await supabase
    .from('anniversaries')
    .select('*')
    .eq('relationship_id', relationshipId);

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export function useRelationshipQueries() {
  const { user } = useAuth();

  // Use the useQuery hook correctly inside the component
  const relationships = useQuery({
    queryKey: ['relationships'],
    queryFn: () => fetchRelationships(user?.id),
    enabled: !!user
  });

  // Define functions that return properly configured queries
  const getRelationship = (id: string) => 
    useQuery({
      queryKey: ['relationship', id],
      queryFn: () => fetchRelationship(id),
      enabled: !!id && !!user,
    });

  const getRelationshipAnniversaries = (relationshipId: string) => 
    useQuery({
      queryKey: ['anniversaries', relationshipId],
      queryFn: () => fetchRelationshipAnniversaries(relationshipId),
      enabled: !!relationshipId && !!user,
    });

  return {
    relationships,
    getRelationship,
    getRelationshipAnniversaries
  };
}
