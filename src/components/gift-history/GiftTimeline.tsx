
import GiftCard from "./GiftCard";
import { Gift } from "./types";
import { useAuth } from "@/contexts/AuthContext";

interface GiftTimelineProps {
  year: string;
  searchQuery: string;
  giftData: Gift[];
  isLoading: boolean;
}

export default function GiftTimeline({ year, searchQuery, giftData, isLoading }: GiftTimelineProps) {
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

  // Group gifts by month and year
  const groupedGifts = filteredGifts.reduce((acc, gift) => {
    const date = new Date(gift.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${month}`;
    
    if (!acc[key]) {
      acc[key] = {
        monthYear: new Date(year, month, 1),
        gifts: []
      };
    }
    
    acc[key].gifts.push(gift);
    return acc;
  }, {} as Record<string, { monthYear: Date; gifts: Gift[] }>);

  // Sort groups by date (most recent first)
  const sortedGroups = Object.values(groupedGifts).sort(
    (a, b) => b.monthYear.getTime() - a.monthYear.getTime()
  );

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
    <div className="pt-4 pb-20">
      {sortedGroups.map(({ monthYear, gifts }) => (
        <div key={monthYear.toISOString()} className="mb-10 relative">
          <div className="sticky top-0 z-10 bg-background py-2">
            <h2 className="text-xl font-semibold">
              {monthYear.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <div className="h-0.5 w-full bg-border mt-2"></div>
          </div>
          
          <div className="mt-6 space-y-6 relative">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />
            
            {gifts.map(gift => (
              <div key={gift.id} className="relative pl-10">
                <div className="absolute left-2 top-4 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <GiftCard gift={gift} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
