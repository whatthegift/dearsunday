
export interface Gift {
  id: string;
  giftName: string;
  recipientName: string;
  date: string;  // ISO date string
  price?: string;
  image?: string;
  occasion?: string;
  sentiment?: number; // 1-5 scale
  notes?: string;
  reaction?: string;
  type: "given" | "received";
  source?: string;
  sourceUrl?: string;
}
