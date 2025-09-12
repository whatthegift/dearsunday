
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarPlus } from "lucide-react";
import { Anniversary, useRelationships } from "@/hooks/use-relationships";
import { useToast } from "@/hooks/use-toast";

const dateSchema = z.object({
  type: z.string().min(1, "Type is required"),
  custom_type: z.string().optional(),
  month: z.coerce.number().min(1).max(12),
  day: z.coerce.number().min(1).max(31),
  year: z.coerce.number().optional(),
  include_year: z.boolean().default(true),
});

type DateFormValues = z.infer<typeof dateSchema>;

interface AddDateDialogProps {
  relationshipId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editMode?: boolean;
  initialData?: Anniversary;
  onSuccess?: (date?: Anniversary) => void; // Update type to accept an Anniversary parameter
}

export default function AddDateDialog({
  relationshipId,
  open,
  onOpenChange,
  editMode = false,
  initialData,
  onSuccess,
}: AddDateDialogProps) {
  const { createAnniversary, updateAnniversary, getRelationshipAnniversaries } = useRelationships();
  const { toast } = useToast();
  const [dateType, setDateType] = useState(initialData?.type || "birthday");
  const [existingDates, setExistingDates] = useState<Anniversary[]>([]);

  // Fetch existing dates for duplicate checking
  useEffect(() => {
    if (open && relationshipId) {
      const fetchDates = async () => {
        const { data } = await getRelationshipAnniversaries(relationshipId);
        if (data) {
          setExistingDates(data);
        }
      };
      fetchDates();
    }
  }, [open, relationshipId, getRelationshipAnniversaries]);

  const form = useForm<DateFormValues>({
    resolver: zodResolver(dateSchema),
    defaultValues: editMode && initialData
      ? {
          type: initialData.type,
          custom_type: initialData.custom_type,
          month: initialData.month,
          day: initialData.day,
          year: initialData.year,
          include_year: initialData.include_year ?? true,
        }
      : {
          type: "birthday",
          custom_type: "",
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
          year: new Date().getFullYear(),
          include_year: true,
        },
  });

  // Check if the date would be a duplicate
  const isDuplicate = (data: DateFormValues) => {
    if (editMode && initialData) return false; // Don't check when editing existing date
    
    return existingDates.some(date => 
      date.type === data.type && 
      date.month === data.month && 
      date.day === data.day
    );
  };

  const handleSubmit = async (data: DateFormValues) => {
    try {
      // Check for duplicates before submitting
      if (isDuplicate(data)) {
        toast({
          title: "Duplicate Date",
          description: `This person already has a ${data.type} on ${data.month}/${data.day}.`,
          variant: "destructive",
        });
        return;
      }

      if (editMode && initialData) {
        const updatedDate = await updateAnniversary.mutateAsync({
          id: initialData.id,
          relationship_id: relationshipId,
          type: data.type,
          custom_type: data.type === "other" ? data.custom_type : undefined,
          month: data.month,
          day: data.day,
          year: data.include_year ? data.year : undefined,
          include_year: data.include_year,
        });

        toast({
          title: "Success",
          description: "Important date updated successfully.",
        });
        
        if (onSuccess) {
          onSuccess(updatedDate);
        }
      } else {
        const newDate = await createAnniversary.mutateAsync({
          relationship_id: relationshipId,
          type: data.type,
          custom_type: data.type === "other" ? data.custom_type : undefined,
          month: data.month,
          day: data.day,
          year: data.include_year ? data.year : undefined,
          include_year: data.include_year,
        });

        toast({
          title: "Success",
          description: "Important date added successfully.",
        });
        
        if (onSuccess) {
          onSuccess(newDate);
        }
      }

      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save date.",
        variant: "destructive",
      });
    }
  };

  // Watch the type field to show/hide custom type input
  const watchType = form.watch("type");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Edit Important Date" : "Add Important Date"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setDateType(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="wedding">Wedding Anniversary</SelectItem>
                      <SelectItem value="graduation">Graduation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchType === "other" && (
              <FormField
                control={form.control}
                name="custom_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g., First Day at Work, Adoption Day"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={12} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={31} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        disabled={!form.watch("include_year")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="include_year"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Include year</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="mt-4">
                {editMode ? "Update" : "Add"} Date
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
