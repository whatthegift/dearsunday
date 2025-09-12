import { CalendarDays, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDates } from "@/hooks/use-dates";
import { Skeleton } from "@/components/ui/skeleton";
export default function UpcomingDates() {
  const navigate = useNavigate();
  const {
    data: upcomingDates,
    isLoading,
    error
  } = useDates();
  const handleGiftIconClick = (personId: string) => {
    navigate(`/chat?relationshipId=${personId}`);
  };

  // Loading state
  if (isLoading) {
    return <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-medium gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span>Upcoming Important Dates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>;
  }

  // Error state
  if (error) {
    return <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-medium gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span>Upcoming Important Dates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-muted-foreground">
            <p>Unable to load upcoming dates.</p>
            <p className="text-sm">Please try again later.</p>
          </div>
        </CardContent>
      </Card>;
  }

  // Empty state
  if (!upcomingDates || upcomingDates.length === 0) {
    return <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-medium gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Upcoming Important Dates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-muted-foreground">
            <p>No dates saved yet! Let's not forget birthdays, anniversaries, or little made-up traditions that deserve a gift.</p>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate("/dates")}>
              Add Important Date
            </Button>
          </div>
        </CardContent>
      </Card>;
  }
  return <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-medium gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <span className="font-medium text-sm">Dates That Deserve a Thought</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingDates.map(event => <div key={event.id} className="date-card flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium text-sm">{event.personName}</span>
                <span className="text-muted-foreground text-xs">{event.eventType} • {event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  {event.daysLeft} days left
                </span>
                <button onClick={() => handleGiftIconClick(event.personId)} className="p-2 text-primary hover:bg-gift-peach rounded-full transition-colors">
                  <Gift className="h-4 w-4" />
                </button>
              </div>
            </div>)}
        </div>
      </CardContent>
    </Card>;
}