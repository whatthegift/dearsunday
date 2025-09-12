
import { useState, useEffect } from "react";
import { Anniversary, Relationship } from "@/hooks/use-relationships";
import { supabase } from "@/integrations/supabase/client";

interface UseAnniversariesProps {
  editMode: boolean;
  initialData?: Relationship;
}

export function useAnniversaries({ editMode, initialData }: UseAnniversariesProps) {
  const [importantDates, setImportantDates] = useState<Anniversary[]>([]);
  
  // If in edit mode and with initial data, we'll fetch anniversaries on mount
  useEffect(() => {
    const loadInitialDates = async () => {
      if (editMode && initialData && initialData.id) {
        try {
          const { data, error } = await supabase
            .from('anniversaries')
            .select('*')
            .eq('relationship_id', initialData.id);
            
          if (error) throw error;
          
          console.log("Initial dates loaded:", data);
          setImportantDates(data || []);
        } catch (error) {
          console.error("Error loading initial dates:", error);
        }
      }
    };
    
    loadInitialDates();
  }, [editMode, initialData?.id]);
  
  const resetImportantDates = () => {
    setImportantDates([]);
  };
  
  // Add a new function to save dates to the database for a given relationship
  const saveDatesToRelationship = async (relationshipId: string) => {
    if (!relationshipId || importantDates.length === 0) return false;
    
    try {
      // Insert all the dates at once
      const { error } = await supabase
        .from('anniversaries')
        .insert(
          importantDates.map(date => ({
            ...date,
            relationship_id: relationshipId
          }))
        );
        
      if (error) throw error;
      
      console.log("Dates saved successfully for relationship:", relationshipId);
      return true;
    } catch (error) {
      console.error("Error saving dates:", error);
      return false;
    }
  };
  
  return {
    importantDates,
    setImportantDates,
    resetImportantDates,
    saveDatesToRelationship
  };
}
