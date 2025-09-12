
import { Button } from "@/components/ui/button";
import DatesList from "./DatesList";
import { Plus } from "lucide-react";
import { Anniversary } from "@/hooks/use-relationships";

interface DatesTabProps {
  dates?: Anniversary[];
  isLoading: boolean;
  onAddDate: () => void;
  onEditDate: (date: Anniversary) => void;
  onDeleteDate: (dateId: string) => void;
}

export function DatesTab({ 
  dates = [], 
  isLoading, 
  onAddDate, 
  onEditDate, 
  onDeleteDate 
}: DatesTabProps) {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          size="sm"
          onClick={onAddDate}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Date
        </Button>
      </div>
      <DatesList
        dates={dates}
        isLoading={isLoading}
        onEdit={onEditDate}
        onDelete={onDeleteDate}
      />
    </div>
  );
}
