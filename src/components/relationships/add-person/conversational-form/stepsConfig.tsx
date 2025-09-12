
import React from "react";
import { 
  NameStep,
  RelationshipStep,
  VibeStep,
  LikesStep,
  DislikesStep,
  DatesStep,
  NotesStep,
  ContactStep
} from "./steps";
import { UseFormReturn } from "react-hook-form";
import { PersonForm } from "../types";
import { Anniversary } from "@/hooks/use-relationships";

export interface StepContentProps {
  form: UseFormReturn<PersonForm>;
  onAddDate: () => void;
  importantDates: Anniversary[];
  refreshDates: () => Promise<void>;
  relationshipId?: string | null;
}

export const steps = [
  {
    id: "name",
    title: "Who is this for?",
    emoji: "🪄",
    prompt: "Let's add someone special. What's their name?",
    fields: ["name"],
    renderContent: ({ form }: StepContentProps) => <NameStep form={form} />
  },
  {
    id: "relationship",
    title: "Your connection",
    emoji: "🧡",
    prompt: "How would you describe your connection?",
    fields: ["relationship_type", "custom_relationship_type"],
    renderContent: ({ form }: StepContentProps) => <RelationshipStep form={form} />
  },
  {
    id: "vibe",
    title: "Their vibe",
    emoji: "✨",
    prompt: "Tell me a little about their vibe.",
    fields: ["gift_preferences.interests"],
    renderContent: ({ form }: StepContentProps) => <VibeStep form={form} />
  },
  {
    id: "likes",
    title: "What they love",
    emoji: "📚",
    prompt: "Jot down their favorite things",
    fields: ["gift_preferences.likes"],
    renderContent: ({ form }: StepContentProps) => <LikesStep form={form} />
  },
  {
    id: "dislikes",
    title: "No-gift zones",
    emoji: "🚫",
    prompt: "Any no-gift zones?",
    fields: ["gift_preferences.dislikes"],
    renderContent: ({ form }: StepContentProps) => <DislikesStep form={form} />
  },
  {
    id: "dates",
    title: "Important dates",
    emoji: "🎂",
    prompt: "Do you want to remember any dates for them?",
    fields: [],
    renderContent: ({ onAddDate, importantDates, refreshDates, relationshipId }: StepContentProps) => (
      <DatesStep 
        onAddDate={onAddDate} 
        importantDates={importantDates} 
        refreshDates={refreshDates} 
        relationshipId={relationshipId}
      />
    )
  },
  {
    id: "notes",
    title: "A note for yourself",
    emoji: "📝",
    prompt: "Why do you want to remember this person?",
    fields: ["notes"],
    renderContent: ({ form }: StepContentProps) => <NotesStep form={form} />
  },
  {
    id: "contact",
    title: "Contact details",
    emoji: "📱",
    prompt: "Would you like to add any contact details?",
    fields: ["email", "phone"],
    renderContent: ({ form }: StepContentProps) => <ContactStep form={form} />
  },
];
