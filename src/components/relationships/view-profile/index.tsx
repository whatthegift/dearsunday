
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Gift, Info, Loader2, PlusCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRelationships, Anniversary } from "@/hooks/use-relationships";
import { useGifts } from "@/hooks/gifts"; // Updated import path
import AddPersonDialog from "../AddPersonDialog";
import { useNavigate } from "react-router-dom";

// Import the subcomponents
import { ProfileHeader } from "../ProfileHeader";
import { ProfileInfo } from "../ProfileInfo";
import { DatesTab } from "../DatesTab";
import { GiftsTab } from "../GiftsTab";
import { DeleteProfileDialog } from "./DeleteProfileDialog";
import { AddEditDateDialogs } from "./AddEditDateDialogs";

interface ViewProfileDialogProps {
  relationshipId: string;
}

export default function ViewProfileDialog({ relationshipId }: ViewProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDateDialogOpen, setAddDateDialogOpen] = useState(false);
  const [editDateDialogOpen, setEditDateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Anniversary | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteProfileDialogOpen, setIsDeleteProfileDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const { 
    getRelationship, 
    getRelationshipAnniversaries
  } = useRelationships();
  const { fetchGiftsByRelationship } = useGifts();
  
  const relationshipQuery = getRelationship(relationshipId);
  const person = relationshipQuery.data;
  
  const anniversariesQuery = getRelationshipAnniversaries(relationshipId);
  const anniversaries = anniversariesQuery.data;
  
  const giftsQuery = fetchGiftsByRelationship(relationshipId);
  const gifts = giftsQuery.data;

  const handleEditPerson = () => {
    setOpen(false);
    setEditDialogOpen(true);
  };

  const handleDeletePerson = () => {
    setIsDeleteProfileDialogOpen(true);
  };

  const handleAddDate = () => {
    setAddDateDialogOpen(true);
  };

  const handleEditDate = (date: Anniversary) => {
    setSelectedDate(date);
    setEditDateDialogOpen(true);
  };

  const handleDeleteDate = (dateId: string) => {
    const dateToDelete = anniversaries?.find(date => date.id === dateId);
    if (dateToDelete) {
      setSelectedDate(dateToDelete);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleAddGift = () => {
    navigate(`/gifts/add?relationshipId=${relationshipId}`);
  };

  const refreshDates = async () => {
    await anniversariesQuery.refetch();
  };

  if (relationshipQuery.isLoading) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Loading...
      </Button>
    );
  }

  if (!person) {
    return (
      <Button variant="outline" disabled>
        Profile Not Found
      </Button>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">View Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-hidden flex flex-col">
          <ProfileHeader
            person={person}
            onEdit={handleEditPerson}
            onDelete={handleDeletePerson}
          />
          
          <Tabs defaultValue="info" className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="info" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>Info</span>
              </TabsTrigger>
              <TabsTrigger value="dates" className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>Dates</span>
              </TabsTrigger>
              <TabsTrigger value="gifts" className="flex items-center gap-1">
                <Gift className="h-4 w-4" />
                <span>Gifts</span>
              </TabsTrigger>
            </TabsList>
            
            <ScrollArea className="flex-1">
              <TabsContent value="info" className="mt-0">
                <ProfileInfo person={person} />
              </TabsContent>
              
              <TabsContent value="dates" className="mt-0">
                <DatesTab
                  dates={anniversaries}
                  isLoading={anniversariesQuery.isLoading}
                  onAddDate={handleAddDate}
                  onEditDate={handleEditDate}
                  onDeleteDate={handleDeleteDate}
                />
              </TabsContent>
              
              <TabsContent value="gifts" className="mt-0">
                <div className="flex justify-end mb-4">
                  <Button
                    size="sm"
                    onClick={handleAddGift}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Add Gift</span>
                  </Button>
                </div>
                <GiftsTab 
                  gifts={gifts || []}
                  isLoading={giftsQuery.isLoading}
                />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>

      {person && (
        <AddPersonDialog 
          open={editDialogOpen} 
          onOpenChange={setEditDialogOpen} 
          editMode={true}
          initialData={person}
        />
      )}

      <AddEditDateDialogs
        relationshipId={relationshipId}
        addDateDialogOpen={addDateDialogOpen}
        setAddDateDialogOpen={setAddDateDialogOpen}
        editDateDialogOpen={editDateDialogOpen}
        setEditDateDialogOpen={setEditDateDialogOpen}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        refreshDates={refreshDates}
      />

      <DeleteProfileDialog
        open={isDeleteProfileDialogOpen}
        onOpenChange={setIsDeleteProfileDialogOpen}
        personId={person.id}
        personName={person.name}
      />
    </>
  );
}
