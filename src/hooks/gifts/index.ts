
import { useGiftQueries } from './use-gift-queries';
import { useGiftMutations } from './use-gift-mutations';

export function useGifts() {
  const { gifts, fetchGiftsByRelationship } = useGiftQueries();
  const { createGift, updateGift, deleteGift } = useGiftMutations();

  return {
    gifts,
    fetchGiftsByRelationship,
    createGift,
    updateGift,
    deleteGift,
  };
}

export type { Gift, NewGift } from './types';
