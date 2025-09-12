
import { RelationshipCard } from "./RelationshipCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Relationship } from "@/hooks/use-relationships";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface RelationshipCardsProps {
  relationships: Relationship[];
  isLoading: boolean;
  onAddPerson: () => void;
}

export default function RelationshipCards({ 
  relationships, 
  isLoading, 
  onAddPerson 
}: RelationshipCardsProps) {
  const navigate = useNavigate();

  const handleGiftIdeasClick = (personId: string) => {
    navigate(`/chat?personId=${personId}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-14 w-14 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-20 w-full rounded-md" />
              </div>
              <div className="p-4 bg-muted/20">
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (relationships.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <h3 className="text-lg font-medium mb-2">No relationships yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Start by adding people you care about and keep track of important dates and gift ideas.
        </p>
        <Button onClick={onAddPerson} className="inline-flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Your First Person
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relationships.map((person) => (
        <RelationshipCard 
          key={person.id} 
          person={person} 
          onGiftIdeasClick={handleGiftIdeasClick}
        />
      ))}
    </div>
  );
}
