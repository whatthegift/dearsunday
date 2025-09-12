
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GiftCard from "@/components/gift-history/GiftCard";
import { useGifts } from "@/hooks/gifts"; // Updated import path
import { useEffect, useState } from "react";

interface GiftingHistoryProps {
  relationshipId: string;
  gifts?: any[];
  isLoading?: boolean;
}

export function GiftingHistory({
  relationshipId,
  gifts = [],
  isLoading = false
}: GiftingHistoryProps) {
  const navigate = useNavigate();
  const { fetchGiftsByRelationship } = useGifts();
  const [giftData, setGiftData] = useState(gifts);
  const [isLoadingData, setIsLoadingData] = useState(isLoading);
  
  // Use useEffect to fetch gifts if they weren't provided as props
  useEffect(() => {
    if (gifts.length === 0 && !isLoading) {
      const fetchGifts = async () => {
        try {
          const giftsQuery = fetchGiftsByRelationship(relationshipId);
          setIsLoadingData(giftsQuery.isLoading);
          
          if (giftsQuery.data) {
            setGiftData(giftsQuery.data);
          }
        } catch (error) {
          console.error("Error fetching gifts:", error);
        }
      };
      
      fetchGifts();
    } else {
      setGiftData(gifts);
      setIsLoadingData(isLoading);
    }
  }, [relationshipId, gifts, isLoading, fetchGiftsByRelationship]);
  
  const handleAddGift = () => {
    navigate(`/gifts/add?recipient=${relationshipId}`);
  };
  
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-base font-normal">
          <Gift className="h-5 w-5 mr-2 text-gift-peach" />
          Gifting History
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleAddGift} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Add Gift</span>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoadingData ? (
          <div className="space-y-2">
            {[1, 2].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-md" />)}
          </div>
        ) : giftData.length > 0 ? (
          <div className="space-y-4">
            {giftData.map(gift => (
              <GiftCard key={gift.id} gift={{
                id: gift.id,
                giftName: gift.name,
                recipientName: "",  // We don't need this when viewing a specific person
                date: gift.date_given || new Date().toISOString(),
                price: gift.price ? `$${gift.price}` : undefined,
                image: Array.isArray(gift.photos) && gift.photos.length > 0 ? String(gift.photos[0]) : undefined,
                occasion: gift.occasion,
                notes: gift.description || "",  // Use description instead of notes
                type: "given"
              }} />
            ))}
          </div>
        ) : (
          <div className="bg-muted p-6 rounded-lg text-center">
            <Gift className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">No gifts recorded yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Keep track of gift ideas and past presents
            </p>
            <Button variant="outline" size="sm" onClick={handleAddGift} className="mt-4">
              Record First Gift
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
