
import { useState } from "react";
import { Anniversary } from "@/hooks/relationships/types";
import { useRelationships } from "@/hooks/use-relationships";
import { useToast } from "@/hooks/use-toast";

export function useDateOperations(relationshipId: string) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Anniversary | null>(null);
  const { getRelationshipAnniversaries } = useRelationships();
  const { toast } = useToast();

  const handleAddDate = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditDate = (date: Anniversary) => {
    setSelectedDate(date);
    setIsEditDialogOpen(true);
  };

  const refreshDates = async () => {
    if (relationshipId) {
      await getRelationshipAnniversaries(relationshipId).refetch();
    }
  };

  const closeAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDate(null);
  };

  return {
    isAddDialogOpen,
    isEditDialogOpen,
    selectedDate,
    handleAddDate,
    handleEditDate,
    refreshDates,
    closeAddDialog,
    closeEditDialog,
    setSelectedDate
  };
}
