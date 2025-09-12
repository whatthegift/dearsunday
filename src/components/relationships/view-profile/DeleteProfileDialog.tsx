
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";
import { useRelationships } from "@/hooks/use-relationships";
import { useToast } from "@/hooks/use-toast";

interface DeleteProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  personId: string;
  personName: string;
}

export function DeleteProfileDialog({
  open,
  onOpenChange,
  personId,
  personName
}: DeleteProfileDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { deleteRelationship } = useRelationships();

  const confirmDeletePerson = async () => {
    if (!personId || isDeleting) return;
    
    try {
      setIsDeleting(true);
      
      // Close the delete profile dialog
      onOpenChange(false);
      
      // Execute the delete operation
      await deleteRelationship.mutateAsync(personId);
      
      // Show success message
      toast({
        title: "Profile Deleted",
        description: `${personName} has been deleted from your relationships.`
      });
      
      // Navigate back to relationships page
      navigate("/relationships", { replace: true });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete profile",
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
      onConfirm={confirmDeletePerson}
      title="Delete Profile"
      description={`Are you sure you want to delete ${personName}'s profile? All associated dates and information will be permanently removed.`}
      actionLabel="Delete Profile"
      disabled={isDeleting}
    />
  );
}
