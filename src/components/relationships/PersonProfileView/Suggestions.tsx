
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Relationship } from "@/hooks/use-relationships";

interface SuggestionsProps {
  person: Relationship;
}

export function Suggestions({ person }: SuggestionsProps) {
  const navigate = useNavigate();
  
  const handleGetIdeas = () => {
    navigate(`/chat?personId=${person.id}`);
  };

  // These suggestions should ideally come from an API based on the person's preferences
  const generateSuggestions = () => {
    const interests = person.gift_preferences?.interests || [];
    const defaultSuggestions = [
      {
        id: 1,
        name: "Handcrafted Gift",
        description: "A unique, personalized item made just for them",
        price: "$45",
        image: "https://placehold.co/300x200/f8f8f8/d4d4d4"
      },
      {
        id: 2,
        name: "Experience Gift",
        description: "Create memories together with a shared activity",
        price: "$28",
        image: "https://placehold.co/300x200/f8f8f8/d4d4d4"
      }
    ];

    return defaultSuggestions;
  };

  const suggestions = generateSuggestions();

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-normal flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-gift-yellow" />
          Sunday's Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 suggestions-box max-h-[300px] overflow-y-auto pr-2">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-background rounded-lg border overflow-hidden">
              <div 
                className="h-32 bg-center bg-cover" 
                style={{ backgroundImage: `url(${suggestion.image})` }}
              />
              <div className="p-3">
                <h3 className="font-medium text-sm">{suggestion.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {suggestion.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">{suggestion.price}</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    Save idea
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full mt-2 bg-gift-cream/30 hover:bg-gift-cream/50 border-gift-cream"
            onClick={handleGetIdeas}
          >
            <span>Explore more gift ideas</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
