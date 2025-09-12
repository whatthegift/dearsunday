
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Gift } from './types';

export function useGiftQueries() {
  const { user } = useAuth();

  const fetchGifts = async (): Promise<Gift[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .order('date_given', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  };

  const gifts = useQuery({
    queryKey: ['gifts'],
    queryFn: fetchGifts,
    enabled: !!user
  });

  const fetchGiftsByRelationship = (relationshipId: string) => {
    return useQuery({
      queryKey: ['gifts', relationshipId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('gifts')
          .select('*')
          .eq('recipient_id', relationshipId)
          .order('date_given', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        return data || [];
      },
      enabled: !!relationshipId && !!user
    });
  };

  return {
    gifts,
    fetchGiftsByRelationship,
  };
}
