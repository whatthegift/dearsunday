
import { useState } from "react";
import { Gift } from "./types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddGiftForm } from "./AddGiftForm";
import { toast } from "@/components/ui/use-toast";
interface AddGiftDialogProps {
  onGiftAdded: (gift: Gift) => void;
}
export default function AddGiftDialog({
  onGiftAdded
}: AddGiftDialogProps) {
  const [open, setOpen] = useState(false);
  const handleSubmit = (data: Partial<Gift>) => {
    // Ensure required fields are present
    if (!data.giftName || !data.recipientName || !data.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Create a complete Gift object
    const newGift: Gift = {
      id: data.id || crypto.randomUUID(),
      giftName: data.giftName,
      recipientName: data.recipientName,
      date: data.date || new Date().toISOString(),
      type: data.type as "given" | "received",
      price: data.price,
      image: data.image,
      occasion: data.occasion,
      sentiment: data.sentiment,
      notes: data.notes,
      reaction: data.reaction,
      source: data.source,
      sourceUrl: data.sourceUrl
    };
    onGiftAdded(newGift);
    setOpen(false);
    toast({
      title: "Success",
      description: "Gift added successfully!"
    });
  };
  return <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Gift
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Gift</DialogTitle>
        </DialogHeader>
        <AddGiftForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>;
}
