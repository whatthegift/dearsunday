
import { useState } from "react";
import { Relationship, Anniversary, useRelationships } from "@/hooks/use-relationships";
import { PersonForm } from "../types";
import { supabase } from "@/integrations/supabase/client";

interface UsePersonFormSubmitProps {
  editMode: boolean;
  initialData?: Relationship;
  toast: any;
}

export function usePersonFormSubmit({
  editMode,
  initialData,
  toast
}: UsePersonFormSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createRelationship, updateRelationship } = useRelationships();
  
  const handleSubmit = async (
    data: PersonForm,
    importantDates: Anniversary[],
    saveDatesToRelationship: (relationshipId: string) => Promise<boolean>,
    tempRelationshipId: string | null
  ): Promise<string | null> => {
    try {
      setIsSubmitting(true);
      
      // Format the data to match the Relationship type
      const formattedData = {
        name: data.name,
        relationship_type: data.relationship_type === 'other' 
          ? (data.custom_relationship_type || 'other') 
          : data.relationship_type,
        email: data.email || null,
        phone: data.phone || null,
        notes: data.notes || null,
        photo_url: data.profile_image || null,
      };
      
      let relationshipId: string | null = null;
      
      // Update or create the relationship
      if (editMode && initialData) {
        // Update existing relationship
        const result = await updateRelationship.mutateAsync({
          id: initialData.id,
          ...formattedData
        });
        
        relationshipId = result.id;
        
        // Now handle anniversaries separately to make sure they're updated correctly
        if (importantDates.length > 0) {
          // First, delete any existing anniversaries for this relationship that are no longer present
          const { data: existingDates } = await supabase
            .from('anniversaries')
            .select('id')
            .eq('relationship_id', relationshipId);
            
          const existingIds = existingDates?.map(date => date.id) || [];
          const currentIds = importantDates.map(date => date.id);
          
          const idsToDelete = existingIds.filter(id => !currentIds.includes(id));
          
          if (idsToDelete.length > 0) {
            await supabase
              .from('anniversaries')
              .delete()
              .in('id', idsToDelete);
          }
          
          // Then save any new dates or update existing ones
          for (const date of importantDates) {
            if (date.id && existingIds.includes(date.id)) {
              // Update existing date
              await supabase
                .from('anniversaries')
                .update({
                  title: date.title,
                  description: date.description,
                  date: date.date,
                  recurring: date.recurring
                })
                .eq('id', date.id);
            } else {
              // Insert new date
              await supabase
                .from('anniversaries')
                .insert({
                  ...date,
                  relationship_id: relationshipId
                });
            }
          }
        }
      } else {
        // Create new relationship
        const result = await createRelationship.mutateAsync(formattedData);
        relationshipId = result.id;
        
        // Save important dates
        if (importantDates.length > 0) {
          // Update relationship_id for each date
          const datesWithRelationship = importantDates.map(date => ({
            ...date,
            relationship_id: relationshipId
          }));
          
          // Insert all dates at once
          await supabase
            .from('anniversaries')
            .insert(datesWithRelationship);
        }
      }
      
      return relationshipId;
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to save person. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    isSubmitting,
    handleSubmit
  };
}
