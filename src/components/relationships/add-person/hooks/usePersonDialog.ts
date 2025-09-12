
import { useDialogState } from "./useDialogState";
import { useRelationshipTemp } from "./useRelationshipTemp";
import { useAnniversaries } from "./useAnniversaries";
import { usePersonFormSubmit } from "./usePersonFormSubmit";
import { Relationship, Anniversary } from "@/hooks/use-relationships";
import { PersonForm } from "../types";
import { useRelationships } from "@/hooks/use-relationships";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UsePersonDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  editMode?: boolean;
  initialData?: Relationship;
  toast: any;
}

export function usePersonDialog({
  open,
  onOpenChange,
  editMode = false,
  initialData,
  toast
}: UsePersonDialogProps) {
  const dialogState = useDialogState({ open, onOpenChange });
  const tempRelationship = useRelationshipTemp({ editMode, toast });
  const anniversaries = useAnniversaries({ editMode, initialData });
  const formSubmit = usePersonFormSubmit({ editMode, initialData, toast });
  const { relationships } = useRelationships();
  const [anniversaryData, setAnniversaryData] = useState<Anniversary[]>([]);
  
  // Only fetch anniversaries when in edit mode
  useEffect(() => {
    if (editMode && initialData?.id) {
      fetchAnniversaries(initialData.id);
    }
  }, [editMode, initialData?.id]);
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Clean up on close
      if (!editMode) {
        anniversaries.resetImportantDates();
        tempRelationship.resetTempRelationship();
      }
      
      // Reset any ongoing dialog state
      dialogState.setAddDateDialogOpen(false);
      dialogState.setNewPersonCreated(false);
    }
    
    dialogState.handleOpenChange(open);
  };
  
  // Handle adding a date
  const handleAddDate = async () => {
    dialogState.setAddDateDialogOpen(true);
  };
  
  const fetchAnniversaries = async (relationshipId: string) => {
    try {
      if (relationshipId) {
        const { data, error } = await supabase
          .from('anniversaries')
          .select('*')
          .eq('relationship_id', relationshipId);
          
        if (error) throw error;
        
        anniversaries.setImportantDates(data || []);
        setAnniversaryData(data || []);
      }
    } catch (error) {
      console.error("Error fetching anniversaries:", error);
      toast({
        title: "Error",
        description: "Failed to load important dates",
        variant: "destructive"
      });
    }
  };
  
  const refreshDates = async () => {
    if (editMode && initialData?.id) {
      await fetchAnniversaries(initialData.id);
    }
  };
  
  const onSubmit = async (data: PersonForm) => {
    // Mark as completed
    dialogState.setNewPersonCreated(true);
    
    // Don't create a temporary relationship ID - we'll only create the relationship on final submit
    // Submit the form with the important dates
    const relationshipId = await formSubmit.handleSubmit(
      data,
      anniversaries.importantDates,
      anniversaries.saveDatesToRelationship,
      tempRelationship.tempRelationshipId
    );
    
    if (relationshipId) {
      // Close the dialog
      handleOpenChange(false);
      
      // Invalidate cache to refresh the relationships list
      relationships.refetch();
      
      // Show success toast
      toast({
        title: editMode ? "Person updated" : "Person added",
        description: editMode 
          ? "The profile has been updated successfully"
          : "A new person has been added to your relationships",
      });
    }
  };
  
  return {
    isOpen: dialogState.isOpen,
    setIsOpen: dialogState.setIsOpen,
    importantDates: anniversaries.importantDates,
    setImportantDates: anniversaries.setImportantDates,
    handleOpenChange,
    handleAddDate,
    onSubmit,
    refreshDates,
    isSubmitting: formSubmit.isSubmitting,
    tempRelationshipId: tempRelationship.tempRelationshipId,
    addDateDialogOpen: dialogState.addDateDialogOpen,
    setAddDateDialogOpen: dialogState.setAddDateDialogOpen
  };
}
