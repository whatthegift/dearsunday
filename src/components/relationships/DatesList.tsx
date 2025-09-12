
import { useState } from "react";
import { Calendar, CalendarClock, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Anniversary } from "@/hooks/use-relationships";

interface DatesListProps {
  dates?: Anniversary[];
  isLoading?: boolean;
  onEdit?: (date: Anniversary) => void;
  onDelete?: (dateId: string) => void;
}

export default function DatesList({
  dates = [],
  isLoading = false,
  onEdit,
  onDelete,
}: DatesListProps) {
  const [dateFormat, setDateFormat] = useState<"date" | "relative">("date");

  const toggleDateFormat = () => {
    setDateFormat(dateFormat === "date" ? "relative" : "date");
  };

  if (isLoading) {
    return (
      <div className="space-y-4 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Helper function to format date
  const formatAnniversaryDate = (month: number, day: number, year?: number, includeYear?: boolean) => {
    // Create a date object with the anniversary date
    const currentYear = new Date().getFullYear();
    const dateObj = new Date(year || currentYear, month - 1, day);
    
    // Format based on whether to include the year
    if (includeYear && year) {
      return format(dateObj, "MMMM d, yyyy");
    } else {
      return format(dateObj, "MMMM d");
    }
  };

  // Get days until the next occurrence
  const getDaysUntil = (month: number, day: number): string => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Create a date for this year's occurrence
    let nextDate = new Date(currentYear, month - 1, day);
    
    // If the date has passed this year, use next year's date
    if (nextDate < today) {
      nextDate = new Date(currentYear + 1, month - 1, day);
    }
    
    // Calculate difference in days
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today!";
    if (diffDays === 1) return "Tomorrow!";
    return `In ${diffDays} days`;
  };

  return (
    <div className="space-y-4 mt-4">
      {dates.length === 0 ? (
        <div className="text-center p-6 border border-dashed rounded-lg text-muted-foreground">
          <CalendarClock className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No important dates added yet</p>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDateFormat}
              className="text-xs"
            >
              {dateFormat === "date" ? "Show days until" : "Show date"}
            </Button>
          </div>
          <ScrollArea className="max-h-[350px]">
            <div className="space-y-4 pr-4">
              {dates.map((date) => (
                <Card key={date.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-medium">
                      {date.title}
                      {date.description ? `: ${date.description}` : ""}
                    </CardTitle>
                    {(onEdit || onDelete) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(date)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => onDelete(date.id)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {dateFormat === "date"
                          ? new Date(date.date).toLocaleDateString()
                          : `${Math.ceil((new Date(date.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`}
                      </span>
                    </div>
                    {new Date(date.date).getFullYear() && (
                      <Badge variant="outline" className="mt-2">
                        {new Date().getFullYear() - new Date(date.date).getFullYear()} years
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
}
