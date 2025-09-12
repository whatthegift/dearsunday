
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Relationship } from "@/hooks/use-relationships";

interface ProfileHeaderProps {
  person: Relationship;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProfileHeader({ person, onEdit, onDelete }: ProfileHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get avatar color based on ID
  const getAvatarColor = (id: string) => {
    const colors = ["bg-gift-peach", "bg-gift-lavender", "bg-gift-sage", "bg-gift-blush", "bg-gift-cream"];
    return colors[parseInt(id.slice(-1), 16) % colors.length];
  };

  return (
    <>
      <DialogHeader className="mb-4 flex justify-between items-center">
        <DialogTitle>Profile</DialogTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={onEdit}
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
        </div>
      </DialogHeader>
      
      <div className="flex items-center gap-4 mb-6">
        <Avatar className={`h-16 w-16 ${!person.profile_image ? getAvatarColor(person.id) : ""}`}>
          {person.profile_image ? (
            <AvatarImage src={person.profile_image} alt={person.name} />
          ) : null}
          <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{person.name}</h2>
          <Badge variant="outline" className="mt-1">
            {person.custom_relationship_type || person.relationship_type}
          </Badge>
        </div>
      </div>
    </>
  );
}
