
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRelationships } from "@/hooks/use-relationships";
import { useGifts } from "@/hooks/gifts"; // Updated import path
import { Gift } from "./types";

interface AddGiftFormProps {
  onSubmit?: (data: Partial<Gift>) => void;
}

export function AddGiftForm({ onSubmit }: AddGiftFormProps) {
  const [open, setOpen] = useState(false);
  const [giftDate, setGiftDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [giftName, setGiftName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [occasion, setOccasion] = useState("");
  const { toast } = useToast();
  
  const { relationships: { data: people = [] } } = useRelationships();
  const { createGift } = useGifts();

  const resetForm = () => {
    setGiftDate(new Date());
    setSelectedPerson("");
    setGiftName("");
    setPrice("");
    setNotes("");
    setOccasion("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPerson || !giftName) {
      toast({
        title: "Missing information",
        description: "Please fill in the required fields.",
        variant: "destructive",
      });
      return;
    }

    if (onSubmit) {
      const selectedPersonObj = people.find(p => p.id === selectedPerson);
      onSubmit({
        giftName,
        recipientName: selectedPersonObj?.name || "",
        date: giftDate.toISOString(),
        price,
        occasion,
        notes,
        type: "given"
      });
      resetForm();
      setOpen(false);
      return;
    }

    try {
      const priceValue = price ? parseFloat(price) : undefined;
      await createGift.mutateAsync({
        name: giftName,
        price: priceValue,
        date_given: giftDate.toISOString(),
        occasion: occasion,
        description: notes,
        relationship_id: selectedPerson,
        recipient_id: selectedPerson // Add recipient_id to match the expected type
      });

      toast({
        title: "Gift added",
        description: "The gift has been added to your history.",
      });
      
      resetForm();
      setOpen(false);
    } catch (error: any) {
      console.error("Error adding gift:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add gift to history.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Gift</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Gift to History</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="person" className="required">Person</Label>
            <Select 
              value={selectedPerson} 
              onValueChange={setSelectedPerson}
              required
            >
              <SelectTrigger id="person">
                <SelectValue placeholder="Select a person" />
              </SelectTrigger>
              <SelectContent>
                {people.map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    {person.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gift-name" className="required">Gift Name</Label>
            <Input 
              id="gift-name" 
              value={giftName} 
              onChange={(e) => setGiftName(e.target.value)} 
              placeholder="What did you give?"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input 
              id="price" 
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="0.00"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date Given</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {giftDate ? format(giftDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={giftDate}
                  onSelect={(date) => {
                    setGiftDate(date || new Date());
                    setCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Input 
              id="occasion" 
              value={occasion} 
              onChange={(e) => setOccasion(e.target.value)} 
              placeholder="Birthday, Christmas, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Any additional details about the gift"
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={createGift.isPending}>
              {createGift.isPending ? "Adding..." : "Add Gift"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddGiftForm;
