
import { Json } from '@/integrations/supabase/types';

export type Relationship = {
  id: string;
  user_id: string;
  name: string;
  // Allow custom values while keeping common presets
  relationship_type: 'family' | 'friend' | 'colleague' | 'acquaintance' | 'partner' | 'other' | string;
  
  // Supabase columns
  email?: string | null;
  phone?: string | null;
  photo_url?: string | null;
  birthday?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
  likes?: string[] | null;
  dislikes?: string[] | null;
  personality_traits?: string[] | null;

  // Legacy/compat fields used in UI
  custom_relationship_type?: string | null;
  profile_image?: string | null;
  contact_info?: { email?: string; phone?: string } | null;
  gift_preferences?: {
    likes?: string;
    dislikes?: string;
    sizes?: string;
    interests?: string | string[];
  } | null;

  // Optional extras (not guaranteed in DB)
  last_updated?: string;
  date_added?: string;
  status?: string;
  initials?: string;
};

export type Anniversary = {
  id?: string; // optional for local (pre-insert) items
  relationship_id?: string; // will be set on save
  title: string;
  description?: string | null;
  date: string; // ISO date (YYYY-MM-DD)
  recurring?: boolean;
};
