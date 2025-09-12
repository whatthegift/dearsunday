import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function GiftIdeas() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const { data: giftIdeas, isLoading, error } = useQuery({
    queryKey: ['dashboard-gift-ideas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gift_ideas')
        .select('*')
        .order('save_date', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      
      return data?.map(gift => ({
        id: gift.id,
        name: gift.name,
        description: gift.description || "A thoughtful gift option",
        price: gift.estimated_price && typeof gift.estimated_price === 'object' && 'min' in gift.estimated_price && 'max' in gift.estimated_price ? 
          `$${gift.estimated_price.min}-${gift.estimated_price.max}` : 
          "Price varies",
        category: gift.category || "General"
      })) || [];
    }
  });

  const handleSaveIdea = (giftId: string) => {
    setSavedIds(prev => [...prev, giftId]);
    
    toast({
      title: "Gift idea saved",
      description: "Added to your ThoughtBox"
    });
  };

  const handleViewGift = (giftId: string) => {
    navigate(`/gifts/${giftId}`);
  };

  const handleViewMore = () => {
    navigate("/gifts");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-medium gap-2">
            <Gift className="h-5 w-5 text-primary" />
            <span>Gift Ideas For You</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <div className="flex space-x-1">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !giftIdeas || giftIdeas.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-medium gap-2">
            <Gift className="h-5 w-5 text-primary" />
            <span>Gift Ideas For You</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center">
            <p className="text-muted-foreground">No sparks yet - but once you tell me about someone, I'll fill this space with thoughtful treasures.</p>
            <Button onClick={() => navigate("/chat")} className="mt-4">
              Get Gift Ideas
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-medium gap-2">
          <Gift className="h-5 w-5 text-primary" />
          <span>Gift Ideas For You</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {giftIdeas.map((gift) => (
            <div 
              key={gift.id}
              className="gift-card"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{gift.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {gift.description}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm font-medium">{gift.price}</span>
                    <span className="text-xs bg-gift-lavender text-secondary-foreground px-2 py-0.5 rounded-full ml-2">
                      {gift.category}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => handleSaveIdea(gift.id)}
                    disabled={savedIds.includes(gift.id)}
                  >
                    <Bookmark className={`h-4 w-4 ${savedIds.includes(gift.id) ? 'fill-primary text-primary' : ''}`} />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => handleViewGift(gift.id)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-2" onClick={handleViewMore}>
            View More Gift Ideas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
