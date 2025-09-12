
import { useState } from "react";
import { Plus, Edit2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Relationship } from "@/hooks/use-relationships";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatSidebarProps {
  relationships: Relationship[];
  isLoading: boolean;
  selectedPersonId: string | null;
  onSelectPerson: (id: string) => void;
  onAddPerson: () => void;
}

export function ChatSidebar({ 
  relationships, 
  isLoading, 
  selectedPersonId, 
  onSelectPerson, 
  onAddPerson 
}: ChatSidebarProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Generate avatar text from name (first letter of first and last name)
  const getAvatarText = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Get avatar display - icon or initials
  const getAvatarDisplay = (person: Relationship) => {
    if (person.profile_image) {
      return (
        <Avatar className="h-10 w-10">
          <AvatarImage src={person.profile_image} alt={person.name} />
          <AvatarFallback>{getAvatarText(person.name)}</AvatarFallback>
        </Avatar>
      );
    } 
    
    return (
      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
        {person.initials || getAvatarText(person.name)}
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card className="w-full md:w-64 h-full overflow-hidden border-r border-gift-yellow-lighter">
        <div className="p-4 border-b border-gift-yellow-lighter flex justify-between items-center">
          <h2 className="font-semibold text-sm">Your People</h2>
          <Button size="icon" className="h-8 w-8 rounded-full bg-[#4CAF50] hover:bg-[#45a049]">
            <Plus className="h-4 w-4 text-white" />
          </Button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 border-b border-gray-100 flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-3 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // If there are no relationships, show an empty state
  if (relationships.length === 0) {
    return (
      <Card className="w-full md:w-64 h-full overflow-hidden border-r border-gift-yellow-lighter">
        <div className="p-4 border-b border-gift-yellow-lighter flex justify-between items-center">
          <h2 className="font-semibold text-sm">Your People</h2>
          <Button size="icon" className="h-8 w-8 rounded-full bg-[#4CAF50] hover:bg-[#45a049]" onClick={onAddPerson}>
            <Plus className="h-4 w-4 text-white" />
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[calc(100%-60px)] p-4">
          <p className="text-muted-foreground text-sm text-center mb-4">
            No people yet. Add someone to start a gifting conversation.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={onAddPerson}
          >
            <Plus className="h-4 w-4 mr-2" /> 
            Add Your First Person
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full md:w-64 h-full overflow-hidden border-r border-gift-yellow-lighter">
      <div className="p-4 border-b border-gift-yellow-lighter flex justify-between items-center">
        <h2 className="font-semibold text-sm">Your People</h2>
        <Button 
          size="icon" 
          className="h-8 w-8 rounded-full bg-[#4CAF50] hover:bg-[#45a049]" 
          onClick={onAddPerson}
        >
          <Plus className="h-4 w-4 text-white" />
        </Button>
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-60px)]">
        {relationships.map((person) => {
          const isSelected = selectedPersonId === person.id;
          
          return (
            <div
              key={person.id}
              className={`p-3 cursor-pointer border-b border-gray-100 flex items-start gap-3 transition-colors ${
                isSelected ? 'bg-[#FFF4D4]' : 'hover:bg-[#FFF4D4]/50'
              }`}
              onClick={() => onSelectPerson(person.id)}
            >
              <div className="flex-shrink-0 mt-1">
                {getAvatarDisplay(person)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-sm truncate">{person.name}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {formatTime(new Date(person.last_updated))}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {/* This would ideally show the last message, but for now we'll use a placeholder */}
                  Let's talk about gift ideas for {person.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
