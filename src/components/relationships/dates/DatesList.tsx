
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Anniversary } from "@/hooks/relationships/types";
import { Skeleton } from "@/components/ui/skeleton";
import { DateCard } from "./DateCard";
import { EmptyDatesState } from "./EmptyDatesState";

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
  const [dateFormat, setDateFormat] = useState<"date" | "relative">("relative");

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

  if (dates.length === 0) {
    return <EmptyDatesState />;
  }

  return (
    <div className="space-y-4 mt-4">
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
      {dates.map((date) => (
        <DateCard
          key={date.id}
          date={date}
          dateFormat={dateFormat}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
