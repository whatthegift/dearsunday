import { useState } from "react";
import { Calendar, Filter, Grid3X3, List, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GiftTimeline from "@/components/gift-history/GiftTimeline";
import GiftGrid from "@/components/gift-history/GiftGrid";
import GiftHistoryFilters from "@/components/gift-history/GiftHistoryFilters";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddGiftDialog from "@/components/gift-history/AddGiftDialog";
import { Gift } from "@/components/gift-history/types";
import { useGifts } from "@/hooks/gifts";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

export default function GiftHistoryPage() {
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterYear, setFilterYear] = useState<string>("all");
  const {
    user
  } = useAuth();
  const {
    gifts
  } = useGifts();
  const formattedGifts: Gift[] = user && gifts.data ? gifts.data.map(dbGift => ({
    id: dbGift.id,
    giftName: dbGift.name,
    recipientName: dbGift.recipient_id || "Unknown",
    date: dbGift.date_given || dbGift.date_added,
    price: dbGift.price ? `$${dbGift.price}` : undefined,
    occasion: dbGift.occasion,
    notes: dbGift.notes,
    type: dbGift.user_id === user?.id ? "given" : "received"
  })) : [];
  const currentYear = new Date().getFullYear();
  const years = Array.from({
    length: 5
  }, (_, i) => currentYear - i);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const resetFilters = () => {
    setSearchQuery("");
    setFilterYear("all");
  };
  const handleAddGift = (newGift: Gift) => {
    gifts.refetch();
  };
  return <div className="space-y-6 animated-entry">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="tracking-tight text-base font-semibold">📜 Gifts You've Given</h1>
          <AddGiftDialog onGiftAdded={handleAddGift} />
        </div>
        <p className="text-muted-foreground mt-1 text-sm font-thin my-0">
          Your journey of thoughtfulness and joy, all in one place.
        </p>
      </div>

      {formattedGifts.length === 0 ? <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground text-sm font-semibold">No gifts given just yet - but it all starts with one thoughtful gesture. Let's make someone's day soon.</p>
            <Button onClick={() => gifts.refetch()} className="mt-4">
              Add Your First Gift
            </Button>
          </CardContent>
        </Card> : <>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search gifts..." className="pl-9" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map(year => <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>)}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={toggleFilters} className={showFilters ? "bg-accent" : ""}>
                <Filter className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon" onClick={resetFilters} title="Reset Filters">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <div className="ml-auto hidden md:flex">
              <Tabs defaultValue="timeline" className="w-full" onValueChange={value => setViewMode(value as "timeline" | "grid")}>
                <TabsList className="grid w-auto grid-cols-2">
                  <TabsTrigger value="timeline" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline-block">Timeline</span>
                  </TabsTrigger>
                  <TabsTrigger value="grid" className="flex items-center gap-1">
                    <Grid3X3 className="h-4 w-4" />
                    <span className="hidden sm:inline-block">Grid</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {showFilters && <GiftHistoryFilters />}
          
          <ScrollArea className="h-[calc(100vh-220px)]">
            {viewMode === "timeline" ? <GiftTimeline year={filterYear} searchQuery={searchQuery} giftData={formattedGifts} isLoading={gifts.isLoading} /> : <GiftGrid year={filterYear} searchQuery={searchQuery} giftData={formattedGifts} isLoading={gifts.isLoading} />}
          </ScrollArea>
        </>}
    </div>;
}
