import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// In a real app, these would come from an API or database
const NEWS_ITEMS = [{
  id: 1,
  date: "April 16",
  content: "I can now help you find gifts based on personality types! Just tell me what kind of person you're shopping for. 🎁"
}, {
  id: 2,
  date: "April 10",
  content: "Mother's Day is coming up on May 12th! Start planning now for the perfect gift. 💐"
}, {
  id: 3,
  date: "April 3",
  content: "New feature: Save gift ideas to specific people in your relationships. Try it out! 💫"
}, {
  id: 4,
  date: "March 28",
  content: "Easter is around the corner! Need gift ideas for the little ones? Just ask me! 🐰"
}, {
  id: 5,
  date: "March 20",
  content: "Spring gifting season has begun! Let me help you find the perfect seasonal gifts. 🌸"
}, {
  id: 6,
  date: "March 15",
  content: "Now you can track your gifting history with each person in your relationships. 📝"
}];
export function WhatsNewWithSunday() {
  return <Card className="border-gift-yellow-lighter">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <span className="font-normal text-sm">✨ What's New with Sunday?</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-0 rounded-sm">
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-4">
            {NEWS_ITEMS.map(item => <div key={item.id} className="border-l-2 border-gift-yellow-light pl-4 py-1">
                <div className="text-xs font-medium text-muted-foreground">{item.date}</div>
                <div className="text-sm mt-1">{item.content}</div>
              </div>)}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>;
}