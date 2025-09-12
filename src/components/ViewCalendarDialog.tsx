
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { useDates } from "@/hooks/use-dates";

export function ViewCalendarDialog() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const { data: upcomingDates } = useDates();
  
  // Find events that occur on the selected date
  // Adding a null check to avoid the undefined.length error
  const eventsOnSelectedDate = date && upcomingDates 
    ? upcomingDates.filter(event => {
        const [month, day, year] = event.date.split('/').map(Number);
        const eventDate = new Date(year, month - 1, day);
        return eventDate.getDate() === date.getDate() && 
               eventDate.getMonth() === date.getMonth();
      })
    : [];
  
  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span>View Calendar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Calendar View</DialogTitle>
          <DialogDescription>
            View your important dates and events
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border shadow-sm pointer-events-auto"
          />
        </div>
        {date && (
          <div className="mt-4">
            <h3 className="text-sm font-medium">
              {format(date, "MMMM d, yyyy")}
            </h3>
            {eventsOnSelectedDate.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {eventsOnSelectedDate.map((event) => (
                  <li key={event.id} className="text-sm p-2 bg-muted rounded-md">
                    <span className="font-medium">{event.eventType}</span> - {event.personName}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">No events scheduled for this date</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
