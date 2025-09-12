
import { useState } from "react";

interface UseRelationshipTempProps {
  editMode: boolean;
  toast: any;
}

export function useRelationshipTemp({ editMode, toast }: UseRelationshipTempProps) {
  const [tempRelationshipId, setTempRelationshipId] = useState<string | null>(null);
  
  // In this improved version, we won't create a temporary relationship
  // The relationship will only be created when the form is fully submitted
  
  const resetTempRelationship = () => {
    setTempRelationshipId(null);
  };

  return {
    tempRelationshipId,
    resetTempRelationship
  };
}
