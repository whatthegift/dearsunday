import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Gift, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ViewCalendarDialog } from "@/components/ViewCalendarDialog";
import { useNavigate } from "react-router-dom";
import { useDates } from "@/hooks/use-dates";
import { Skeleton } from "@/components/ui/skeleton";
import { AddDateButton } from "@/components/dates/AddDateButton";
export default function DatesPage() {
  const navigate = useNavigate();
  const {
    data: importantDates,
    isLoading,
    error
  } = useDates();
  const getAvatarColor = (id: string) => {
    const colors = ["bg-gift-peach", "bg-gift-lavender", "bg-gift-sage", "bg-gift-blush", "bg-gift-cream"];
    return colors[parseInt(id.slice(-1), 16) % colors.length];
  };
  const handleFindGift = (personId: string) => {
    navigate(`/chat?relationshipId=${personId}`);
  };

  // Loading state
  if (isLoading) {
    return <div className="space-y-6 animated-entry">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-base font-semibold tracking-tight">📅 Special Days</h1>
            <p className="text-muted-foreground mt-1">
              Never miss an important occasion
            </p>
          </div>
          <div className="flex gap-2">
            <AddDateButton />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24 mt-1" />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-16 w-full rounded mb-3" />
                <div className="flex justify-end">
                  <Skeleton className="h-9 w-24 rounded" />
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>;
  }

  // Error state
  if (error) {
    return <div className="space-y-6 animated-entry">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-base font-semibold tracking-tight">📅 Special Days</h1>
            <p className="text-muted-foreground mt-1">
              Never miss an important occasion
            </p>
          </div>
          <div className="flex gap-2">
            <AddDateButton />
          </div>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Unable to load important dates.</p>
            <p className="text-sm">Please try again later.</p>
          </CardContent>
        </Card>
      </div>;
  }

  // Empty state
  if (!importantDates || importantDates.length === 0) {
    return <div className="space-y-6 animated-entry">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-base font-semibold tracking-tight">📅 Special Days</h1>
            <p className="text-muted-foreground mt-1">
              Never miss an important occasion
            </p>
          </div>
          <div className="flex gap-2">
            <AddDateButton />
          </div>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No important dates found.</p>
            <p className="text-sm">Add important dates to your relationships to see them here.</p>
            <Button className="mt-4" onClick={() => navigate('/relationships')}>
              Add Relationships
            </Button>
          </CardContent>
        </Card>
      </div>;
  }

  // Main content state
  const today = importantDates.filter(date => date.daysLeft === 0);
  const thisWeek = importantDates.filter(date => date.daysLeft > 0 && date.daysLeft <= 7);
  const thisMonth = importantDates.filter(date => date.daysLeft > 7 && date.daysLeft <= 30);
  const future = importantDates.filter(date => date.daysLeft > 30);
  return <div className="space-y-6 animated-entry">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-base font-semibold tracking-tight">📅 Moments That Matter</h1>
          <p className="text-muted-foreground mt-1 text-sm font-thin">Let's make time feel personal again.</p>
        </div>
        <div className="flex gap-2">
          <AddDateButton />
        </div>
      </div>

      {today.length > 0 && <div className="space-y-3">
          <h2 className="text-lg font-semibold text-primary">Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {today.map(renderDateCard)}
          </div>
        </div>}

      {thisWeek.length > 0 && <div className="space-y-3">
          <h2 className="text-lg font-semibold">This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {thisWeek.map(renderDateCard)}
          </div>
        </div>}

      {thisMonth.length > 0 && <div className="space-y-3">
          <h2 className="text-lg font-semibold">This Month</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {thisMonth.map(renderDateCard)}
          </div>
        </div>}

      {future.length > 0 && <div className="space-y-3">
          <h2 className="text-muted-foreground mt-1 font-thin text-xs">Coming Up</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {future.map(renderDateCard)}
          </div>
        </div>}
    </div>;
  function renderDateCard(event: typeof importantDates[0]) {
    return <Card key={event.id} className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className={`${getAvatarColor(event.personId)} h-10 w-10`}>
              <AvatarFallback>{event.personName?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">{event.personName}</h3>
              <div className="flex items-center text-sm">
                <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground text-xs">{event.eventType}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-normal my-[10px]">{new Date(event.date).toLocaleDateString()}</span>
            <span className="text-xs font-normal">
              {event.daysLeft === 0 ? 'Today!' : `${event.daysLeft} days left`}
            </span>
          </div>
          
          <div className="flex justify-end">
            <Button size="sm" className="flex items-center gap-1" onClick={() => handleFindGift(event.personId)}>
              <Gift className="h-3 w-3" />
              <span>Find Gift</span>
            </Button>
          </div>
        </CardContent>
      </Card>;
  }
}