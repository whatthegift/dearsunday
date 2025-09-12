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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Anniversary } from "@/hooks/relationships/types";
import { useAnniversaryMutations } from "@/hooks/relationships/use-anniversary-mutations";
import { useToast } from "@/hooks/use-toast";

const dateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  month: z.coerce.number().min(1).max(12),
  day: z.coerce.number().min(1).max(31),
  year: z.coerce.number().min(1900).max(2100),
});

type DateFormValues = z.infer<typeof dateSchema>;

interface AddDateDialogProps {
  relationshipId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editMode?: boolean;
  initialData?: Anniversary;
  onSuccess?: (date?: Anniversary) => void;
}

export default function AddDateDialog({
  relationshipId,
  open,
  onOpenChange,
  editMode = false,
  initialData,
  onSuccess,
}: AddDateDialogProps) {
  const { createAnniversary, updateAnniversary } = useAnniversaryMutations();
  const { toast } = useToast();

  const form = useForm<DateFormValues>({
    resolver: zodResolver(dateSchema),
    defaultValues: editMode && initialData
      ? {
          title: initialData.title,
          description: initialData.description || "",
          month: new Date(initialData.date).getMonth() + 1,
          day: new Date(initialData.date).getDate(),
          year: new Date(initialData.date).getFullYear(),
        }
      : {
          title: "Birthday",
          description: "",
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
          year: new Date().getFullYear(),
        },
  });

  const handleSubmit = async (data: DateFormValues) => {
    try {
      const dateString = `${data.year}-${String(data.month).padStart(2, '0')}-${String(data.day).padStart(2, '0')}`;
      
      if (editMode && initialData) {
        const updatedDate = await updateAnniversary.mutateAsync({
          id: initialData.id,
          title: data.title,
          description: data.description || null,
          date: dateString,
          recurring: true,
        });

        if (onSuccess) {
          onSuccess(updatedDate);
        }
      } else {
        const newDate = await createAnniversary.mutateAsync({
          relationship_id: relationshipId,
          title: data.title,
          description: data.description || null,
          date: dateString,
          recurring: true,
        });

        if (onSuccess) {
          onSuccess(newDate);
        }
      }

      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save date.",
        variant: "destructive",
      });
    }
  };

  const watchTitle = form.watch("title");

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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Title</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Birthday">Birthday</SelectItem>
                      <SelectItem value="Anniversary">Anniversary</SelectItem>
                      <SelectItem value="Wedding Anniversary">Wedding Anniversary</SelectItem>
                      <SelectItem value="Graduation">Graduation</SelectItem>
                      <SelectItem value="Work Anniversary">Work Anniversary</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchTitle === "Other" && (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
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
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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