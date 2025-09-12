
import { useState } from "react";
import { Anniversary } from "@/hooks/relationships/types";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";
import { useRelationships } from "@/hooks/use-relationships";
import { useToast } from "@/hooks/use-toast";

interface DeleteDateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Anniversary;
  relationshipId: string;
  onSuccess: () => Promise<void>;
}

export function DeleteDateDialog({ 
  open, 
  onOpenChange, 
  selectedDate, 
  relationshipId,
  onSuccess 
}: DeleteDateDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { deleteAnniversary } = useRelationships();

  const confirmDeleteDate = async () => {
    if (!selectedDate || isDeleting) return;
    
    try {
      setIsDeleting(true);
      
      // Make sure the exact shape of the object matches what the mutation expects
      await deleteAnniversary.mutateAsync({
        id: selectedDate.id,
        relationshipId
      });
      
      toast({
        title: "Date Deleted",
        description: "The important date has been deleted successfully."
      });
      
      // First close dialog, then refresh (to prevent hook errors)
      onOpenChange(false);
      
      // Slight delay before triggering the success callback
      setTimeout(async () => {
        await onSuccess();
      }, 100);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete date",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DeleteConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={confirmDeleteDate}
      title="Delete Important Date"
      description={`Are you sure you want to delete the ${selectedDate?.custom_type || selectedDate?.type} date? This action cannot be undone.`}
      actionLabel="Delete Date"
      disabled={isDeleting}
    />
  );
}
