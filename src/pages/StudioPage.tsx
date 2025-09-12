import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Film, Image, Video, BookOpen, Tag, Info } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Content types and data
type ContentType = "comic" | "gif" | "video" | "update";
type StudioContent = {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  imageUrl: string;
  date: string;
  tags: string[];
  isPinned?: boolean;
};

// Sample data - this would come from an API in a real app
const STUDIO_CONTENT: StudioContent[] = [{
  id: "intro-comic",
  title: "When Gifting Got Serious",
  description: "How Sunday & Friday came to be the ultimate gifting duo.",
  type: "comic",
  imageUrl: "/lovable-uploads/dd3b65d8-7ff1-42cc-9ea0-2e30f9acee65.png",
  date: "2025-03-15",
  tags: ["origin", "story"],
  isPinned: true
}, {
  id: "first-adventure",
  title: "The First Gifting Adventure",
  description: "Sunday & Friday embark on their first mission to find the perfect gift.",
  type: "comic",
  imageUrl: "/lovable-uploads/6721ae61-232f-435e-9a52-f131a7a3fd34.png",
  date: "2025-03-20",
  tags: ["adventure", "story"]
}, {
  id: "gift-wrap-101",
  title: "Gift Wrapping 101",
  description: "Friday teaches Sunday how to wrap gifts properly... with mixed results.",
  type: "gif",
  imageUrl: "/lovable-uploads/91883560-7f13-4a33-acdc-24b738850501.png",
  date: "2025-03-25",
  tags: ["tutorial", "funny"]
}, {
  id: "new-feature",
  title: "Introducing: Gift Sparks",
  description: "Sunday explains the new Gift Sparks feature that helps you find inspiration.",
  type: "update",
  imageUrl: "/lovable-uploads/e0a717ed-371e-4e1e-8d07-e81d8a4ae034.png",
  date: "2025-04-01",
  tags: ["feature", "update"]
}, {
  id: "friday-tips",
  title: "Friday's Last-Minute Gift Tips",
  description: "Quick tips for when you've left gift shopping to the last minute.",
  type: "video",
  imageUrl: "/lovable-uploads/e2458800-7e2c-467a-bddf-7a6753d20167.png",
  date: "2025-04-10",
  tags: ["tips", "help"]
}];
export default function StudioPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const pinnedContent = STUDIO_CONTENT.filter(item => item.isPinned);

  // Filter content based on active filter
  const filteredContent = activeFilter === "all" ? STUDIO_CONTENT.filter(item => !item.isPinned) : STUDIO_CONTENT.filter(item => item.type === activeFilter || item.tags.includes(activeFilter)).filter(item => !item.isPinned);
  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case "comic":
        return <BookOpen className="h-4 w-4" />;
      case "gif":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "update":
        return <Info className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };
  const getTypeName = (type: ContentType) => {
    switch (type) {
      case "comic":
        return "Comic";
      case "gif":
        return "GIF";
      case "video":
        return "Video";
      case "update":
        return "Update";
      default:
        return type;
    }
  };
  return <div className="container max-w-7xl mx-auto animated-entry space-y-8 py-0">
      <h1 className="font-poppins text-lg font-medium">Sunday & Friday Studio</h1>
      <p className="text-muted-foreground">
        Explore the adventures, stories, and updates from our gifting duo Sunday & Friday.
      </p>
      
      {/* Pinned Content */}
      {pinnedContent.length > 0 && <div className="space-y-4">
          <h2 className="font-poppins text-base font-semibold">Featured Content</h2>
          <div className="bg-gift-yellow-lighter bg-opacity-30 p-6 rounded-2xl shadow-md">
            {pinnedContent.map(item => <div key={item.id} className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/2 overflow-hidden rounded-xl shadow-lg">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-auto object-cover" />
                </div>
                <div className="md:w-1/2 space-y-4">
                  <Badge variant="outline" className="bg-white">
                    {getTypeIcon(item.type)}
                    <span className="ml-1">{getTypeName(item.type)}</span>
                  </Badge>
                  <h3 className="text-2xl font-bold font-poppins">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => setActiveFilter(tag)}>
                        {tag}
                      </Badge>)}
                  </div>
                </div>
              </div>)}
          </div>
        </div>}

      {/* Content Filters */}
      <Tabs defaultValue="all" onValueChange={setActiveFilter} className="w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold font-poppins">Browse Content</h2>
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              All
            </TabsTrigger>
            <TabsTrigger value="comic" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Comics
            </TabsTrigger>
            <TabsTrigger value="gif" className="flex items-center gap-1">
              <Image className="h-4 w-4" />
              GIFs
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="update" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              Updates
            </TabsTrigger>
          </TabsList>
        </div>

        {/* All Content Types */}
        <TabsContent value="all" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map(item => <ContentCard key={item.id} content={item} />)}
          </div>
        </TabsContent>

        {/* Type-specific Content */}
        {["comic", "gif", "video", "update"].map(type => <TabsContent key={type} value={type} className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map(item => <ContentCard key={item.id} content={item} />)}
            </div>
          </TabsContent>)}
      </Tabs>

      {/* Featured Carousel */}
      <div className="space-y-4 pt-8">
        <h2 className="text-xl font-semibold font-poppins">Featured Stories</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {STUDIO_CONTENT.slice(0, 4).map(item => <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-gift-yellow-lighter hover:shadow-md transition-shadow">
                    <CardContent className="flex aspect-square items-center justify-center p-0 relative overflow-hidden rounded-t-lg">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <Badge className="absolute top-2 right-2 bg-white">
                        {getTypeIcon(item.type)}
                        <span className="ml-1">{getTypeName(item.type)}</span>
                      </Badge>
                    </CardContent>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </CardHeader>
                  </Card>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>;
}

// Content Card Component
function ContentCard({
  content
}: {
  content: StudioContent;
}) {
  const {
    title,
    description,
    type,
    imageUrl,
    date,
    tags
  } = content;
  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case "comic":
        return <BookOpen className="h-4 w-4" />;
      case "gif":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "update":
        return <Info className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };
  const getTypeName = (type: ContentType) => {
    switch (type) {
      case "comic":
        return "Comic";
      case "gif":
        return "GIF";
      case "video":
        return "Video";
      case "update":
        return "Update";
      default:
        return type;
    }
  };
  return <Card className="overflow-hidden hover:shadow-md transition-shadow border-gift-yellow-lighter">
      <div className="aspect-video relative overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2 bg-white">
          {getTypeIcon(type)}
          <span className="ml-1">{getTypeName(type)}</span>
        </Badge>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>)}
        </div>
        <p className="text-xs text-muted-foreground mt-4">{date}</p>
      </CardContent>
    </Card>;
}