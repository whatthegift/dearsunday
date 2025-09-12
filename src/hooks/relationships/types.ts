
import { Json } from '@/integrations/supabase/types';

export type Relationship = {
  id: string;
  user_id: string;
  name: string;
  relationship_type: 'family' | 'friend' | 'colleague' | 'acquaintance' | 'partner' | 'other';
  custom_relationship_type?: string;
  profile_image?: string;
  notes?: string;
  birthday?: any;
  last_updated: string;
  date_added: string;
  status: string;
  initials?: string;
  contact_info?: any;
  gift_preferences?: any;
};

export type Anniversary = {
  id: string;
  relationship_id: string;
  type: string;
  custom_type?: string;
  month: number;
  day: number;
  year?: number;
  include_year?: boolean;
  date_added: string;
};
