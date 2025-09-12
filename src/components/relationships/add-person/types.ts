
import { z } from "zod";

// Define a union type for relationship types to satisfy TypeScript
export type RelationshipType = 'family' | 'friend' | 'colleague' | 'acquaintance' | 'partner' | 'other';

export const personSchema = z.object({
  name: z.string().min(1, "Name is required"),
  relationship_type: z.enum(['family', 'friend', 'colleague', 'acquaintance', 'partner', 'other'] as const),
  custom_relationship_type: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  notes: z.string().optional(),
  gift_preferences: z.object({
    likes: z.string().optional(),
    dislikes: z.string().optional(),
    sizes: z.string().optional(),
    interests: z.string().optional(),
  }).optional(),
  profile_image: z.string().optional(),
});

export type PersonForm = z.infer<typeof personSchema>;
