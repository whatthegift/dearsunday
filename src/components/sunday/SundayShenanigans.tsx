import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Updated shenanigans with the new image
const SHENANIGANS = [{
  id: 1,
  title: "Meet Sunday and Friday",
  imageUrl: "/lovable-uploads/dd3b65d8-7ff1-42cc-9ea0-2e30f9acee65.png",
  alt: "Sunday and Friday characters introducing themselves"
}, {
  id: 2,
  title: "Friday helping with last-minute gifts",
  imageUrl: "/placeholder.svg",
  alt: "Friday rushing around with gift bags"
}, {
  id: 3,
  title: "Sunday's gift wrapping skills",
  imageUrl: "/placeholder.svg",
  alt: "Sunday attempting to wrap an oddly-shaped gift"
}];
export function SundayShenanigans() {
  const [currentWeek, setCurrentWeek] = useState(0);

  // Update the week number based on the current date
  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const week = Math.floor(diff / oneWeek);
    setCurrentWeek(week);
  }, []);

  // Get this week's shenanigans (cycling through the available ones)
  const thisWeekShenanigans = SHENANIGANS.filter((_, index) => index % SHENANIGANS.length === currentWeek % SHENANIGANS.length);
  return <Card className="border-gift-yellow-lighter">
      
      
    </Card>;
}