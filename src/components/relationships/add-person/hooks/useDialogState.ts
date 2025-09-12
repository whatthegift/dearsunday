
import { useState } from "react";

interface UseDialogStateProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useDialogState({ open, onOpenChange }: UseDialogStateProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDateDialogOpen, setAddDateDialogOpen] = useState(false);
  const [newPersonCreated, setNewPersonCreated] = useState(false);
  
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? open : dialogOpen;
  const setIsOpen = isControlled ? onOpenChange : setDialogOpen;
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when dialog closes (only if not in edit mode)
      setAddDateDialogOpen(false);
    }
    setIsOpen(open);
  };
  
  return {
    isOpen,
    setIsOpen,
    addDateDialogOpen,
    setAddDateDialogOpen,
    newPersonCreated,
    setNewPersonCreated,
    handleOpenChange
  };
}
