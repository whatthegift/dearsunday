export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      anniversaries: {
        Row: {
          custom_type: string | null
          date_added: string
          day: number
          id: string
          include_year: boolean | null
          month: number
          relationship_id: string
          type: string
          year: number | null
        }
        Insert: {
          custom_type?: string | null
          date_added?: string
          day: number
          id?: string
          include_year?: boolean | null
          month: number
          relationship_id: string
          type: string
          year?: number | null
        }
        Update: {
          custom_type?: string | null
          date_added?: string
          day?: number
          id?: string
          include_year?: boolean | null
          month?: number
          relationship_id?: string
          type?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "anniversaries_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          context: Json | null
          created_at: string
          extracted_actions: Json | null
          extracted_insights: Json | null
          id: string
          last_message_at: string
          status: string | null
          summary: string | null
          tags: Json | null
          title: string | null
          user_id: string
        }
        Insert: {
          context?: Json | null
          created_at?: string
          extracted_actions?: Json | null
          extracted_insights?: Json | null
          id?: string
          last_message_at?: string
          status?: string | null
          summary?: string | null
          tags?: Json | null
          title?: string | null
          user_id: string
        }
        Update: {
          context?: Json | null
          created_at?: string
          extracted_actions?: Json | null
          extracted_insights?: Json | null
          id?: string
          last_message_at?: string
          status?: string | null
          summary?: string | null
          tags?: Json | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gift_ideas: {
        Row: {
          availability_period: Json | null
          category: string | null
          conversion_path: string | null
          description: string | null
          estimated_price: Json | null
          expiry_date: string | null
          id: string
          image: string | null
          name: string
          notes: string | null
          photos: Json | null
          potential_occasions: Json | null
          potential_recipients: Json | null
          priority: string | null
          replaced_by: Json | null
          save_date: string
          source: Json | null
          status: string | null
          sunday_confidence: number | null
          sunday_reasoning: string | null
          sunday_recommended: boolean | null
          tags: Json | null
          user_id: string
          visibility: Database["public"]["Enums"]["app_visibility"] | null
        }
        Insert: {
          availability_period?: Json | null
          category?: string | null
          conversion_path?: string | null
          description?: string | null
          estimated_price?: Json | null
          expiry_date?: string | null
          id?: string
          image?: string | null
          name: string
          notes?: string | null
          photos?: Json | null
          potential_occasions?: Json | null
          potential_recipients?: Json | null
          priority?: string | null
          replaced_by?: Json | null
          save_date?: string
          source?: Json | null
          status?: string | null
          sunday_confidence?: number | null
          sunday_reasoning?: string | null
          sunday_recommended?: boolean | null
          tags?: Json | null
          user_id: string
          visibility?: Database["public"]["Enums"]["app_visibility"] | null
        }
        Update: {
          availability_period?: Json | null
          category?: string | null
          conversion_path?: string | null
          description?: string | null
          estimated_price?: Json | null
          expiry_date?: string | null
          id?: string
          image?: string | null
          name?: string
          notes?: string | null
          photos?: Json | null
          potential_occasions?: Json | null
          potential_recipients?: Json | null
          priority?: string | null
          replaced_by?: Json | null
          save_date?: string
          source?: Json | null
          status?: string | null
          sunday_confidence?: number | null
          sunday_reasoning?: string | null
          sunday_recommended?: boolean | null
          tags?: Json | null
          user_id?: string
          visibility?: Database["public"]["Enums"]["app_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "gift_ideas_conversion_path_fkey"
            columns: ["conversion_path"]
            isOneToOne: false
            referencedRelation: "gifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gift_ideas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gifts: {
        Row: {
          category: string | null
          collaborators: Json | null
          creation_details: string | null
          currency: string | null
          custom_occasion: string | null
          date_added: string
          date_given: string | null
          description: string | null
          gift_wrap: Json | null
          id: string
          included_items: Json | null
          inspiration_source: string | null
          is_handmade: boolean | null
          is_received: boolean | null
          last_updated: string
          memories: Json | null
          name: string
          occasion: string | null
          personalized_details: string | null
          photos: Json | null
          price: number | null
          reaction_notes: string | null
          reaction_photos: Json | null
          reaction_score: number | null
          recipient_id: string
          related_gifts: Json | null
          replacement_value: number | null
          source: Json | null
          status: Database["public"]["Enums"]["app_gift_status"] | null
          sunday_confidence: number | null
          sunday_recommended: boolean | null
          tags: Json | null
          thankyou_received: boolean | null
          user_id: string
          visibility: Database["public"]["Enums"]["app_visibility"] | null
        }
        Insert: {
          category?: string | null
          collaborators?: Json | null
          creation_details?: string | null
          currency?: string | null
          custom_occasion?: string | null
          date_added?: string
          date_given?: string | null
          description?: string | null
          gift_wrap?: Json | null
          id?: string
          included_items?: Json | null
          inspiration_source?: string | null
          is_handmade?: boolean | null
          is_received?: boolean | null
          last_updated?: string
          memories?: Json | null
          name: string
          occasion?: string | null
          personalized_details?: string | null
          photos?: Json | null
          price?: number | null
          reaction_notes?: string | null
          reaction_photos?: Json | null
          reaction_score?: number | null
          recipient_id: string
          related_gifts?: Json | null
          replacement_value?: number | null
          source?: Json | null
          status?: Database["public"]["Enums"]["app_gift_status"] | null
          sunday_confidence?: number | null
          sunday_recommended?: boolean | null
          tags?: Json | null
          thankyou_received?: boolean | null
          user_id: string
          visibility?: Database["public"]["Enums"]["app_visibility"] | null
        }
        Update: {
          category?: string | null
          collaborators?: Json | null
          creation_details?: string | null
          currency?: string | null
          custom_occasion?: string | null
          date_added?: string
          date_given?: string | null
          description?: string | null
          gift_wrap?: Json | null
          id?: string
          included_items?: Json | null
          inspiration_source?: string | null
          is_handmade?: boolean | null
          is_received?: boolean | null
          last_updated?: string
          memories?: Json | null
          name?: string
          occasion?: string | null
          personalized_details?: string | null
          photos?: Json | null
          price?: number | null
          reaction_notes?: string | null
          reaction_photos?: Json | null
          reaction_score?: number | null
          recipient_id?: string
          related_gifts?: Json | null
          replacement_value?: number | null
          source?: Json | null
          status?: Database["public"]["Enums"]["app_gift_status"] | null
          sunday_confidence?: number | null
          sunday_recommended?: boolean | null
          tags?: Json | null
          thankyou_received?: boolean | null
          user_id?: string
          visibility?: Database["public"]["Enums"]["app_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "gifts_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "relationships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gifts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: Json | null
          content: string
          conversation_id: string
          id: string
          message_type: string | null
          metadata: Json | null
          reaction_type: string | null
          related_entities: Json | null
          sender: string
          suggestion_accepted: boolean | null
          timestamp: string
        }
        Insert: {
          attachments?: Json | null
          content: string
          conversation_id: string
          id?: string
          message_type?: string | null
          metadata?: Json | null
          reaction_type?: string | null
          related_entities?: Json | null
          sender: string
          suggestion_accepted?: boolean | null
          timestamp?: string
        }
        Update: {
          attachments?: Json | null
          content?: string
          conversation_id?: string
          id?: string
          message_type?: string | null
          metadata?: Json | null
          reaction_type?: string | null
          related_entities?: Json | null
          sender?: string
          suggestion_accepted?: boolean | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      occasions: {
        Row: {
          budget: Json | null
          collaborators: Json | null
          custom_type: string | null
          date: Json
          date_added: string
          gift_expectation: string | null
          gift_history: Json | null
          id: string
          importance: Database["public"]["Enums"]["app_importance"] | null
          is_recurring: boolean | null
          last_updated: string
          name: string
          notes: string | null
          recurrence_rule: string | null
          related_occasions: Json | null
          relationship_id: string | null
          reminder_settings: Json | null
          status: string | null
          type: Database["public"]["Enums"]["app_occasion_type"]
          user_id: string
          visibility: Database["public"]["Enums"]["app_visibility"] | null
        }
        Insert: {
          budget?: Json | null
          collaborators?: Json | null
          custom_type?: string | null
          date: Json
          date_added?: string
          gift_expectation?: string | null
          gift_history?: Json | null
          id?: string
          importance?: Database["public"]["Enums"]["app_importance"] | null
          is_recurring?: boolean | null
          last_updated?: string
          name: string
          notes?: string | null
          recurrence_rule?: string | null
          related_occasions?: Json | null
          relationship_id?: string | null
          reminder_settings?: Json | null
          status?: string | null
          type: Database["public"]["Enums"]["app_occasion_type"]
          user_id: string
          visibility?: Database["public"]["Enums"]["app_visibility"] | null
        }
        Update: {
          budget?: Json | null
          collaborators?: Json | null
          custom_type?: string | null
          date?: Json
          date_added?: string
          gift_expectation?: string | null
          gift_history?: Json | null
          id?: string
          importance?: Database["public"]["Enums"]["app_importance"] | null
          is_recurring?: boolean | null
          last_updated?: string
          name?: string
          notes?: string | null
          recurrence_rule?: string | null
          related_occasions?: Json | null
          relationship_id?: string | null
          reminder_settings?: Json | null
          status?: string | null
          type?: Database["public"]["Enums"]["app_occasion_type"]
          user_id?: string
          visibility?: Database["public"]["Enums"]["app_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "occasions_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "relationships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "occasions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          currency_preference: string | null
          date_created: string
          date_format: string | null
          display_name: string | null
          email: string | null
          id: string
          last_active: string | null
          notification_settings: Json | null
          onboarding_status: Json | null
          phone_number: string | null
          preferences: Json | null
          premium_expiry: string | null
          premium_status:
            | Database["public"]["Enums"]["app_premium_status"]
            | null
          privacy_settings: Json | null
          profile_image: string | null
          referral_code: string | null
          referred_by: string | null
          timezone: string | null
        }
        Insert: {
          currency_preference?: string | null
          date_created?: string
          date_format?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          last_active?: string | null
          notification_settings?: Json | null
          onboarding_status?: Json | null
          phone_number?: string | null
          preferences?: Json | null
          premium_expiry?: string | null
          premium_status?:
            | Database["public"]["Enums"]["app_premium_status"]
            | null
          privacy_settings?: Json | null
          profile_image?: string | null
          referral_code?: string | null
          referred_by?: string | null
          timezone?: string | null
        }
        Update: {
          currency_preference?: string | null
          date_created?: string
          date_format?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          last_active?: string | null
          notification_settings?: Json | null
          onboarding_status?: Json | null
          phone_number?: string | null
          preferences?: Json | null
          premium_expiry?: string | null
          premium_status?:
            | Database["public"]["Enums"]["app_premium_status"]
            | null
          privacy_settings?: Json | null
          profile_image?: string | null
          referral_code?: string | null
          referred_by?: string | null
          timezone?: string | null
        }
        Relationships: []
      }
      relationships: {
        Row: {
          birthday: Json | null
          contact_info: Json | null
          custom_relationship_type: string | null
          date_added: string
          gift_budget_range: Json | null
          gift_preferences: Json | null
          id: string
          initials: string | null
          insight_score: number | null
          last_gift_date: string | null
          last_updated: string
          life_events: Json | null
          memories: Json | null
          name: string
          notes: string | null
          owned_items: Json | null
          photo_gallery: Json | null
          preferred_gift_types: Json | null
          profile_image: string | null
          relationship_type: Database["public"]["Enums"]["app_relationship_type"]
          status: string | null
          tags: Json | null
          user_id: string
        }
        Insert: {
          birthday?: Json | null
          contact_info?: Json | null
          custom_relationship_type?: string | null
          date_added?: string
          gift_budget_range?: Json | null
          gift_preferences?: Json | null
          id?: string
          initials?: string | null
          insight_score?: number | null
          last_gift_date?: string | null
          last_updated?: string
          life_events?: Json | null
          memories?: Json | null
          name: string
          notes?: string | null
          owned_items?: Json | null
          photo_gallery?: Json | null
          preferred_gift_types?: Json | null
          profile_image?: string | null
          relationship_type: Database["public"]["Enums"]["app_relationship_type"]
          status?: string | null
          tags?: Json | null
          user_id: string
        }
        Update: {
          birthday?: Json | null
          contact_info?: Json | null
          custom_relationship_type?: string | null
          date_added?: string
          gift_budget_range?: Json | null
          gift_preferences?: Json | null
          id?: string
          initials?: string | null
          insight_score?: number | null
          last_gift_date?: string | null
          last_updated?: string
          life_events?: Json | null
          memories?: Json | null
          name?: string
          notes?: string | null
          owned_items?: Json | null
          photo_gallery?: Json | null
          preferred_gift_types?: Json | null
          profile_image?: string | null
          relationship_type?: Database["public"]["Enums"]["app_relationship_type"]
          status?: string | null
          tags?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "relationships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reminders: {
        Row: {
          action: string | null
          completed_at: string | null
          date_created: string
          description: string | null
          due_date: string
          id: string
          lead_time: number
          occasion_id: string | null
          priority: Database["public"]["Enums"]["app_importance"] | null
          recurrence: Json | null
          relationship_id: string | null
          sent_via: Json | null
          snooze_count: number | null
          snooze_until: string | null
          status: Database["public"]["Enums"]["app_reminder_status"] | null
          title: string
          user_id: string
        }
        Insert: {
          action?: string | null
          completed_at?: string | null
          date_created?: string
          description?: string | null
          due_date: string
          id?: string
          lead_time: number
          occasion_id?: string | null
          priority?: Database["public"]["Enums"]["app_importance"] | null
          recurrence?: Json | null
          relationship_id?: string | null
          sent_via?: Json | null
          snooze_count?: number | null
          snooze_until?: string | null
          status?: Database["public"]["Enums"]["app_reminder_status"] | null
          title: string
          user_id: string
        }
        Update: {
          action?: string | null
          completed_at?: string | null
          date_created?: string
          description?: string | null
          due_date?: string
          id?: string
          lead_time?: number
          occasion_id?: string | null
          priority?: Database["public"]["Enums"]["app_importance"] | null
          recurrence?: Json | null
          relationship_id?: string | null
          sent_via?: Json | null
          snooze_count?: number | null
          snooze_until?: string | null
          status?: Database["public"]["Enums"]["app_reminder_status"] | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_occasion_id_fkey"
            columns: ["occasion_id"]
            isOneToOne: false
            referencedRelation: "occasions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminders_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "relationships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_gift_status:
        | "idea"
        | "planned"
        | "purchased"
        | "wrapped"
        | "given"
        | "enjoyed"
      app_importance: "low" | "medium" | "high"
      app_occasion_type:
        | "birthday"
        | "anniversary"
        | "holiday"
        | "graduation"
        | "wedding"
        | "other"
      app_premium_status: "free" | "premium" | "trial"
      app_relationship_type:
        | "family"
        | "friend"
        | "colleague"
        | "acquaintance"
        | "partner"
        | "other"
      app_reminder_status: "pending" | "sent" | "dismissed"
      app_visibility: "public" | "friends" | "private"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_gift_status: [
        "idea",
        "planned",
        "purchased",
        "wrapped",
        "given",
        "enjoyed",
      ],
      app_importance: ["low", "medium", "high"],
      app_occasion_type: [
        "birthday",
        "anniversary",
        "holiday",
        "graduation",
        "wedding",
        "other",
      ],
      app_premium_status: ["free", "premium", "trial"],
      app_relationship_type: [
        "family",
        "friend",
        "colleague",
        "acquaintance",
        "partner",
        "other",
      ],
      app_reminder_status: ["pending", "sent", "dismissed"],
      app_visibility: ["public", "friends", "private"],
    },
  },
} as const
