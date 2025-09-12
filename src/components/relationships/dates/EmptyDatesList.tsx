
import { CalendarDays } from "lucide-react";

export function EmptyDatesList() {
  return (
    <div className="text-center p-6 border border-dashed rounded-lg text-muted-foreground">
      <CalendarDays className="h-12 w-12 mx-auto mb-2 opacity-50" />
      <p>No important dates added yet</p>
    </div>
  );
}
