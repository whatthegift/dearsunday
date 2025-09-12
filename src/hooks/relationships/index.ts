
import { useRelationshipQueries } from './use-relationship-queries';
import { useRelationshipMutations } from './use-relationship-mutations';
import { useAnniversaryMutations } from './use-anniversary-mutations';
import { Relationship, Anniversary } from './types';

export type { Relationship, Anniversary };

export function useRelationships() {
  const { relationships, getRelationship, getRelationshipAnniversaries } = useRelationshipQueries();
  const { createRelationship, updateRelationship, deleteRelationship } = useRelationshipMutations();
  const { createAnniversary, updateAnniversary, deleteAnniversary } = useAnniversaryMutations();

  return {
    // Queries
    relationships,
    getRelationship,
    getRelationshipAnniversaries,
    
    // Relationship mutations
    createRelationship,
    updateRelationship,
    deleteRelationship,
    
    // Anniversary mutations
    createAnniversary,
    updateAnniversary,
    deleteAnniversary,
  };
}
