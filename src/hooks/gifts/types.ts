
export type Gift = {
  id: string;
  name: string;
  price?: number;
  date_given?: string;
  occasion?: string;
  description?: string;
  date_added: string;
  user_id: string;
  recipient_id: string;
  relationship_id?: string;
};

export type NewGift = {
  name: string;
  price?: number;
  date_given?: string;
  occasion?: string;
  description?: string;
  recipient_id: string;
  relationship_id?: string;
};
