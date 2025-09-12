import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThoughtBoxEmptyState } from "@/components/wishlist/ThoughtBoxEmptyState";
import { WishlistGrid } from "@/components/wishlist/WishlistGrid";
import { WishlistFilter } from "@/components/wishlist/WishlistFilter";
import { useNavigate } from "react-router-dom";
import { GridIcon, ListIcon, Plus, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface WishlistItem {
  id: string;
  title: string;
  price: string;
  image: string;
  reason: string;
  recipient: string;
  occasion: string;
  status: "idea" | "purchased" | "given";
  dateAdded: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  notes: string;
}

type ViewMode = "grid" | "list";

export default function WishlistsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const {
    data: items = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['wishlists'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('gifts').select(`
          id, 
          name, 
          price, 
          description, 
          status, 
          category,
          date_added,
          recipient_id,
          occasion,
          custom_occasion,
          relationships(name),
          photos,
          tags
        `).order('date_added', {
        ascending: false
      });
      if (error) throw error;
      if (!data) return [];
      return data.map(item => {
        let priorityValue: "Low" | "Medium" | "High" = "Medium";
        if (item.tags && Array.isArray(item.tags)) {
          if (item.tags.includes("High Priority")) priorityValue = "High";else if (item.tags.includes("Low Priority")) priorityValue = "Low";
        }
        return {
          id: item.id,
          title: item.name,
          price: item.price ? `$${item.price}` : "Price unknown",
          image: item.photos && Array.isArray(item.photos) && item.photos.length > 0 ? item.photos[0] : "/placeholder.svg",
          reason: item.description || "",
          recipient: item.relationships?.name || "Unknown",
          occasion: item.custom_occasion || item.occasion || "Just Because",
          status: item.status === "idea" || item.status === "purchased" || item.status === "given" ? item.status : "idea",
          dateAdded: new Date(item.date_added).toLocaleDateString(),
          category: item.category || "Misc",
          priority: priorityValue,
          notes: ""
        };
      });
    }
  });

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.recipient.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "ideas") return matchesSearch && item.status === "idea";
    if (activeTab === "purchased") return matchesSearch && item.status === "purchased";
    if (activeTab === "given") return matchesSearch && item.status === "given";
    return matchesSearch;
  });

  const handleGetIdeas = () => {
    navigate("/chat");
  };

  if (isLoading) {
    return <div className="space-y-6 animated-entry">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ThoughtBox</h1>
            <p className="text-muted-foreground mt-1">
              Your saved gift ideas and inspiration
            </p>
          </div>
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <Skeleton className="h-10 w-full max-w-md" />
          <div className="flex items-center gap-2 self-end md:self-auto">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
        <Skeleton className="h-10 w-64 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
      </div>;
  }

  if (error) {
    return <div className="space-y-6 animated-entry">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ThoughtBox</h1>
            <p className="text-muted-foreground mt-1">
              Your saved gift ideas and inspiration
            </p>
          </div>
          <Button className="flex items-center gap-2" onClick={handleGetIdeas}>
            <Plus className="h-4 w-4" />
            <span>Get Ideas from Sunday</span>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Unable to load your ThoughtBox ideas.</p>
            <p className="text-sm">Please try again later.</p>
          </CardContent>
        </Card>
      </div>;
  }

  return <div className="space-y-6 animated-entry">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="tracking-tight text-base font-semibold">✨ Saved Magic</h1>
          <p className="text-muted-foreground mt-1 text-sm font-thin">
            Your saved gift ideas and inspiration
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleGetIdeas}>
          <Plus className="h-4 w-4" />
          <span>Get Ideas from Sunday</span>
        </Button>
      </div>

      {items.length === 0 ? <ThoughtBoxEmptyState onAddIdea={handleGetIdeas} /> : <>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search saved ideas..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10" />
            </div>
            
            <div className="flex items-center gap-2 self-end md:self-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <WishlistFilter />
                </PopoverContent>
              </Popover>
              
              <div className="bg-muted rounded-md p-1 ml-2">
                <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setViewMode("grid")}>
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setViewMode("list")}>
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="all">All Ideas</TabsTrigger>
              <TabsTrigger value="ideas">Just Ideas</TabsTrigger>
              <TabsTrigger value="purchased">Purchased</TabsTrigger>
              <TabsTrigger value="given">Given</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {filteredItems.length === 0 ? <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No items match your search.</p>
                  </CardContent>
                </Card> : <WishlistGrid items={filteredItems as WishlistItem[]} viewMode={viewMode} />}
            </TabsContent>
            
            <TabsContent value="ideas" className="mt-0">
              {items.filter(item => item.status === "idea" && (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.recipient.toLowerCase().includes(searchQuery.toLowerCase()))).length === 0 ? <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No gift ideas found.</p>
                  </CardContent>
                </Card> : <WishlistGrid items={items.filter(item => item.status === "idea" && (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.recipient.toLowerCase().includes(searchQuery.toLowerCase()))) as WishlistItem[]} viewMode={viewMode} />}
            </TabsContent>
            
            <TabsContent value="purchased" className="mt-0">
              {items.filter(item => item.status === "purchased" && (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.recipient.toLowerCase().includes(searchQuery.toLowerCase()))).length === 0 ? <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No purchased gifts found.</p>
                  </CardContent>
                </Card> : <WishlistGrid items={items.filter(item => item.status === "purchased" && (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.recipient.toLowerCase().includes(searchQuery.toLowerCase()))) as WishlistItem[]} viewMode={viewMode} />}
            </TabsContent>
            
            <TabsContent value="given" className="mt-0">
              {items.filter(item => item.status === "given" && (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.recipient.toLowerCase().includes(searchQuery.toLowerCase()))).length === 0 ? <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No given gifts found.</p>
                  </CardContent>
                </Card> : <WishlistGrid items={items.filter(item => item.status === "given" && (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.recipient.toLowerCase().includes(searchQuery.toLowerCase()))) as WishlistItem[]} viewMode={viewMode} />}
            </TabsContent>
          </Tabs>
        </>}
    </div>;
}
