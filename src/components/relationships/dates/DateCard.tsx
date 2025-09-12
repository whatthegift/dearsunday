
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Anniversary } from "@/hooks/relationships/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatAnniversaryDate, getDaysUntil, getYearsText } from "./utils/dateFormatters";

interface DateCardProps {
  date: Anniversary;
  dateFormat: "date" | "relative";
  onEdit?: (date: Anniversary) => void;
  onDelete?: (dateId: string) => void;
}

export function DateCard({ date, dateFormat, onEdit, onDelete }: DateCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          {date.type}
          {date.custom_type ? `: ${date.custom_type}` : ""}
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
              ? formatAnniversaryDate(date.month, date.day, date.year, date.include_year)
              : getDaysUntil(date.month, date.day)}
          </span>
        </div>
        {date.include_year && date.year && (
          <Badge variant="outline" className="mt-2">
            {getYearsText(date.year)}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
