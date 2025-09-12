
import GiftCard from "./GiftCard";
import { Gift } from "./types";
import { useAuth } from "@/contexts/AuthContext";

interface GiftGridProps {
  year: string;
  searchQuery: string;
  giftData: Gift[];
  isLoading: boolean;
}

export default function GiftGrid({ year, searchQuery, giftData, isLoading }: GiftGridProps) {
  const { user } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
        <p className="text-muted-foreground">Loading your gift history...</p>
      </div>
    );
  }
  
  // Filter gifts based on year and search query
  const filteredGifts = giftData.filter(gift => {
    const matchesYear = year === "all" || new Date(gift.date).getFullYear().toString() === year;
    const matchesSearch = searchQuery === "" || 
      gift.giftName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.recipientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesYear && matchesSearch;
  });
  
  if (filteredGifts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <div className="w-24 h-24 mb-4 rounded-full bg-accent flex items-center justify-center">
          <span className="text-4xl">🎁</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">No gifts found</h3>
        <p className="text-muted-foreground max-w-md">
          {searchQuery 
            ? "Try adjusting your search or filters" 
            : user ? "Start recording your gift history by adding your first gift" : "Please log in to view your gift history"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 pb-20">
      {filteredGifts.map(gift => (
        <GiftCard key={gift.id} gift={gift} variant="grid" />
      ))}
    </div>
  );
}
