import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GiftRecommendationCarousel } from "@/components/GiftRecommendationCarousel";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
const categories = ["All", "Tech", "Personalized", "Lifestyle", "Experience", "Home"];
export default function GiftIdeasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const {
    data: giftRecommendations,
    isLoading,
    error
  } = useQuery({
    queryKey: ['gift-ideas'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('gift_ideas').select('*').order('save_date', {
        ascending: false
      });
      if (error) throw error;
      return data || [];
    }
  });
  const filteredGiftRecommendations = giftRecommendations?.filter(gift => (selectedCategory === "All" || gift.category === selectedCategory) && (gift.name.toLowerCase().includes(searchQuery.toLowerCase()) || gift.description?.toLowerCase().includes(searchQuery.toLowerCase())));
  const formatGiftData = gifts => {
    return gifts?.map(gift => ({
      id: gift.id,
      title: gift.name,
      price: gift.estimated_price ? `$${gift.estimated_price.min}-${gift.estimated_price.max}` : "Price unknown",
      image: gift.image || "/placeholder.svg",
      reason: gift.sunday_reasoning || gift.description,
      category: gift.category || "Uncategorized"
    })) || [];
  };
  const popularRecommendations = formatGiftData(filteredGiftRecommendations?.filter(gift => gift.sunday_recommended));
  const techGifts = formatGiftData(filteredGiftRecommendations?.filter(gift => gift.category === "Tech"));
  const personalizedGifts = formatGiftData(filteredGiftRecommendations?.filter(gift => gift.category === "Personalized"));
  const handleChatClick = () => {
    navigate("/chat");
  };
  if (isLoading) {
    return <div className="space-y-6 animated-entry">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="tracking-tight text-base font-semibold flex items-center gap-2">
              <Gift className="h-8 w-8 text-gift-yellow" />
              🎁 Gift Sparks
            </h1>
            <p className="text-muted-foreground mt-1">
              Discover thoughtfully curated gift recommendations
            </p>
          </div>
        </div>

        <Skeleton className="h-10 w-full mb-4" />

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => <Skeleton key={category} className="h-10 w-24" />)}
        </div>

        <div className="space-y-8">
          <div>
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="h-64">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>;
  }
  if (error) {
    return <div className="space-y-6 animated-entry">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="tracking-tight text-base font-semibold flex items-center gap-2">
              <Gift className="h-8 w-8 text-gift-yellow" />
              🎁 Gift Sparks
            </h1>
            <p className="text-muted-foreground mt-1">
              Discover thoughtfully curated gift recommendations
            </p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Unable to load gift ideas.</p>
            <p className="text-sm">Please try again later.</p>
            <Button className="mt-4" onClick={handleChatClick}>
              Chat with Sunday for Ideas
            </Button>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="space-y-6 animated-entry">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="tracking-tight text-base font-semibold">
            🎁 Gift Sparks
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-thin">Tiny ideas that made you pause.</p>
        </div>
        <Button onClick={handleChatClick}>
          Get New Ideas
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search gift ideas..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => <Button key={category} variant={selectedCategory === category ? "default" : "outline"} className="whitespace-nowrap" onClick={() => setSelectedCategory(category)}>
            {category}
          </Button>)}
      </div>

      {!filteredGiftRecommendations || filteredGiftRecommendations.length === 0 ? <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground text-sm font-semibold">
              {!giftRecommendations || giftRecommendations.length === 0 ? "No gift ideas found." : "No gift ideas match your search."}
            </p>
            <Button className="mt-4" onClick={handleChatClick}>
              Chat with Sunday for Ideas
            </Button>
          </CardContent>
        </Card> : <div className="space-y-8">
          {popularRecommendations.length > 0 && <div>
              <h2 className="text-xl font-semibold mb-4">Popular Recommendations</h2>
              <GiftRecommendationCarousel recommendations={popularRecommendations} />
            </div>}

          {techGifts.length > 0 && <div>
              <h2 className="text-xl font-semibold mb-4">Tech Enthusiasts</h2>
              <GiftRecommendationCarousel recommendations={techGifts} />
            </div>}

          {personalizedGifts.length > 0 && <div>
              <h2 className="text-xl font-semibold mb-4">Personalized Gifts</h2>
              <GiftRecommendationCarousel recommendations={personalizedGifts} />
            </div>}

          {filteredGiftRecommendations.length > 0 && popularRecommendations.length === 0 && techGifts.length === 0 && personalizedGifts.length === 0 && <div>
              <h2 className="text-xl font-semibold mb-4">All Gift Ideas</h2>
              <GiftRecommendationCarousel recommendations={formatGiftData(filteredGiftRecommendations)} />
            </div>}
        </div>}
    </div>;
}