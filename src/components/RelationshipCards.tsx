import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRelationships } from "@/hooks/use-relationships";
import { Skeleton } from "@/components/ui/skeleton";

export default function RelationshipCards() {
  const navigate = useNavigate();
  const { relationships: { data: relationships = [], isLoading, error } } = useRelationships();
  
  const getAvatarColor = (id: string) => {
    const colors = [
      "bg-gift-peach", 
      "bg-gift-lavender", 
      "bg-gift-sage", 
      "bg-gift-blush", 
      "bg-gift-cream"
    ];
    return colors[parseInt(id.slice(-1), 16) % colors.length];
  };

  const handleFindGift = () => {
    navigate("/chat");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-medium gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Relationships</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-10 w-full mt-4" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-medium gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Relationships</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">Unable to load relationships.</p>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate("/relationships")}
          >
            Manage Relationships
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-medium gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span>Relationships</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {relationships.length === 0 ? (
          <div className="text-center py-2">
            <p className="text-muted-foreground">You haven't added anyone yet… but the world is full of lovely people to think of. Want to start with someone close to your heart?</p>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate("/relationships")}
            >
              Add Someone Special
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relationships.slice(0, 3).map((person) => (
              <div 
                key={person.id}
                className="relationship-card flex items-center gap-3"
              >
                <Avatar className={`${getAvatarColor(person.id)} h-10 w-10`}>
                  <AvatarFallback>{person.initials || person.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{person.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {person.custom_relationship_type || person.relationship_type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={handleFindGift}
        >
          Find Gift Ideas
        </Button>
      </CardContent>
    </Card>
  );
}
