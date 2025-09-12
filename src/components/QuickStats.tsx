import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Gift, Heart, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuickStats() {
  const {
    data: stats,
    isLoading,
    error
  } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Get relationship count
      const {
        count: relationshipsCount,
        error: relError
      } = await supabase.from('relationships').select('id', {
        count: 'exact',
        head: true
      });
      if (relError) throw relError;

      // Get upcoming events count
      const {
        count: occasionsCount,
        error: occError
      } = await supabase.from('occasions').select('id', {
        count: 'exact',
        head: true
      });
      if (occError) throw occError;

      // Get gift ideas count
      const {
        count: giftIdeasCount,
        error: giftIdeasError
      } = await supabase.from('gift_ideas').select('id', {
        count: 'exact',
        head: true
      });
      if (giftIdeasError) throw giftIdeasError;

      // Get given gifts count
      const {
        count: givenGiftsCount,
        error: givenGiftsError
      } = await supabase.from('gifts').select('id', {
        count: 'exact',
        head: true
      }).eq('status', 'given');
      if (givenGiftsError) throw givenGiftsError;

      return [{
        title: "Your People",
        value: relationshipsCount?.toString() || '0',
        icon: Users,
        color: "bg-gift-lavender",
        textColor: "text-purple-600"
      }, {
        title: "Moments That Matter",
        value: occasionsCount?.toString() || '0',
        icon: Calendar,
        color: "bg-gift-sage",
        textColor: "text-green-600"
      }, {
        title: "Saved Sparks",
        value: giftIdeasCount?.toString() || '0',
        icon: Gift,
        color: "bg-gift-peach",
        textColor: "text-orange-600"
      }, {
        title: "Gifts You've Shared",
        value: givenGiftsCount?.toString() || '0',
        icon: Heart,
        color: "bg-gift-blush",
        textColor: "text-pink-600"
      }];
    }
  });

  if (isLoading) {
    return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 w-full" />)}
      </div>;
  }

  if (error || !stats) {
    const fallbackStats = [{
      title: "Your People",
      value: "0",
      icon: Users,
      color: "bg-gift-lavender",
      textColor: "text-purple-600"
    }, {
      title: "Moments That Matter",
      value: "0",
      icon: Calendar,
      color: "bg-gift-sage",
      textColor: "text-green-600"
    }, {
      title: "Saved Sparks",
      value: "0",
      icon: Gift,
      color: "bg-gift-peach",
      textColor: "text-orange-600"
    }, {
      title: "Gifts You've Shared",
      value: "0",
      icon: Heart,
      color: "bg-gift-blush",
      textColor: "text-pink-600"
    }];
    return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {fallbackStats.map((stat, index) => <Card key={index} className="border-none shadow-sm">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
              <div className={`p-3 rounded-full ${stat.color} mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
              </div>
              <div className="text-2xl font-semibold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </CardContent>
          </Card>)}
      </div>;
  }

  return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => <Card key={index} className="border-none shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <div className={`p-3 rounded-full ${stat.color} mb-3`}>
              <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
            </div>
            <div className="text-xl font-semibold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.title}</div>
          </CardContent>
        </Card>)}
    </div>;
}
