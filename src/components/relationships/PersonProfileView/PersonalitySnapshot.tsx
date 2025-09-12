
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ThumbsUp, ThumbsDown } from "lucide-react";
import { Relationship } from "@/hooks/use-relationships";

interface PersonalitySnapshotProps {
  person: Relationship;
}

export function PersonalitySnapshot({ person }: PersonalitySnapshotProps) {
  // Convert preferences to arrays
  const getLikes = () => {
    if (!person.gift_preferences?.likes) return [];
    return Array.isArray(person.gift_preferences.likes) 
      ? person.gift_preferences.likes 
      : person.gift_preferences.likes.split(',').map(i => i.trim());
  };

  const getDislikes = () => {
    if (!person.gift_preferences?.dislikes) return [];
    return Array.isArray(person.gift_preferences.dislikes) 
      ? person.gift_preferences.dislikes 
      : person.gift_preferences.dislikes.split(',').map(i => i.trim());
  };

  const likes = getLikes();
  const dislikes = getDislikes();

  if (likes.length === 0 && dislikes.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center font-normal text-base">
          <Heart className="h-5 w-5 mr-2 text-gift-peach" />
          Personality Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {likes.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1 text-muted-foreground" />
              Likes to receive
            </h3>
            <div className="flex flex-wrap gap-2">
              {likes.map((like, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="px-3 py-1 bg-gift-sage text-foreground hover:bg-gift-sage/80"
                >
                  {like}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {dislikes.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <ThumbsDown className="h-4 w-4 mr-1 text-muted-foreground" />
              Avoids
            </h3>
            <div className="flex flex-wrap gap-2">
              {dislikes.map((dislike, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="px-3 py-1 bg-gift-blush text-foreground hover:bg-gift-blush/80"
                >
                  {dislike}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
