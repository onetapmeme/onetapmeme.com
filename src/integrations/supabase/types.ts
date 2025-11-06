export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          rarity: string
          requirement_type: string
          requirement_value: number
          xp_reward: number
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          rarity?: string
          requirement_type: string
          requirement_value: number
          xp_reward?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          rarity?: string
          requirement_type?: string
          requirement_value?: number
          xp_reward?: number
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_avatar_url: string | null
          author_name: string
          category: string
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          author_avatar_url?: string | null
          author_name: string
          category: string
          content: string
          cover_image_url?: string | null
          created_at?: string
          excerpt: string
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          author_avatar_url?: string | null
          author_name?: string
          category?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      launch_config: {
        Row: {
          audit_auditor: string | null
          audit_completed: boolean
          audit_date: string | null
          audit_report_url: string | null
          audit_score: string | null
          buy_link: string
          chart_link: string
          contract_address: string
          id: string
          is_launched: boolean
          launch_date: string
          lp_amount: string
          lp_lock_url: string
          lp_locked: boolean
          lp_platform: string
          lp_unlock_date: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          audit_auditor?: string | null
          audit_completed?: boolean
          audit_date?: string | null
          audit_report_url?: string | null
          audit_score?: string | null
          buy_link: string
          chart_link: string
          contract_address: string
          id?: string
          is_launched?: boolean
          launch_date: string
          lp_amount: string
          lp_lock_url: string
          lp_locked?: boolean
          lp_platform: string
          lp_unlock_date?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          audit_auditor?: string | null
          audit_completed?: boolean
          audit_date?: string | null
          audit_report_url?: string | null
          audit_score?: string | null
          buy_link?: string
          chart_link?: string
          contract_address?: string
          id?: string
          is_launched?: boolean
          launch_date?: string
          lp_amount?: string
          lp_lock_url?: string
          lp_locked?: boolean
          lp_platform?: string
          lp_unlock_date?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      meme_votes: {
        Row: {
          created_at: string | null
          id: string
          meme_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          meme_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          meme_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meme_votes_meme_id_fkey"
            columns: ["meme_id"]
            isOneToOne: false
            referencedRelation: "memes"
            referencedColumns: ["id"]
          },
        ]
      }
      memes: {
        Row: {
          accessories: Json | null
          background: string | null
          created_at: string | null
          id: string
          image_url: string
          shares: number | null
          template_name: string | null
          user_id: string | null
          views: number | null
        }
        Insert: {
          accessories?: Json | null
          background?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          shares?: number | null
          template_name?: string | null
          user_id?: string | null
          views?: number | null
        }
        Update: {
          accessories?: Json | null
          background?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          shares?: number | null
          template_name?: string | null
          user_id?: string | null
          views?: number | null
        }
        Relationships: []
      }
      partnerships: {
        Row: {
          announcement_date: string | null
          created_at: string
          id: string
          is_active: boolean | null
          partner_description: string | null
          partner_logo_url: string
          partner_name: string
          website_url: string | null
        }
        Insert: {
          announcement_date?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          partner_description?: string | null
          partner_logo_url: string
          partner_name: string
          website_url?: string | null
        }
        Update: {
          announcement_date?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          partner_description?: string | null
          partner_logo_url?: string
          partner_name?: string
          website_url?: string | null
        }
        Relationships: []
      }
      player_inventory: {
        Row: {
          collected_at: string
          drop_icon: string
          drop_name: string
          drop_rarity: string
          id: string
          is_equipped: boolean
          rank_name: string
          user_id: string
        }
        Insert: {
          collected_at?: string
          drop_icon: string
          drop_name: string
          drop_rarity: string
          id?: string
          is_equipped?: boolean
          rank_name: string
          user_id: string
        }
        Update: {
          collected_at?: string
          drop_icon?: string
          drop_name?: string
          drop_rarity?: string
          id?: string
          is_equipped?: boolean
          rank_name?: string
          user_id?: string
        }
        Relationships: []
      }
      player_progress: {
        Row: {
          clicks: number
          created_at: string
          current_rank_index: number
          id: string
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          clicks?: number
          created_at?: string
          current_rank_index?: number
          id?: string
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          clicks?: number
          created_at?: string
          current_rank_index?: number
          id?: string
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      ranks: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          min_xp: number
          name: string
          rank_index: number
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          min_xp: number
          name: string
          rank_index: number
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          min_xp?: number
          name?: string
          rank_index?: number
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referral_code: string
          referred_wallet: string
          referrer_wallet: string
          rewards_earned: number | null
          volume_generated: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          referral_code: string
          referred_wallet: string
          referrer_wallet: string
          rewards_earned?: number | null
          volume_generated?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          referral_code?: string
          referred_wallet?: string
          referrer_wallet?: string
          rewards_earned?: number | null
          volume_generated?: number | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_xp: {
        Row: {
          id: string
          level: number | null
          memes_created: number | null
          shares_count: number | null
          total_xp: number | null
          updated_at: string | null
          user_id: string | null
          votes_received: number | null
        }
        Insert: {
          id?: string
          level?: number | null
          memes_created?: number | null
          shares_count?: number | null
          total_xp?: number | null
          updated_at?: string | null
          user_id?: string | null
          votes_received?: number | null
        }
        Update: {
          id?: string
          level?: number | null
          memes_created?: number | null
          shares_count?: number | null
          total_xp?: number | null
          updated_at?: string | null
          user_id?: string | null
          votes_received?: number | null
        }
        Relationships: []
      }
      wallet_stats: {
        Row: {
          created_at: string
          first_tx_date: string | null
          id: string
          last_tx_date: string | null
          total_volume: number | null
          transaction_count: number | null
          updated_at: string
          wallet_address: string
        }
        Insert: {
          created_at?: string
          first_tx_date?: string | null
          id?: string
          last_tx_date?: string | null
          total_volume?: number | null
          transaction_count?: number | null
          updated_at?: string
          wallet_address: string
        }
        Update: {
          created_at?: string
          first_tx_date?: string | null
          id?: string
          last_tx_date?: string | null
          total_volume?: number | null
          transaction_count?: number | null
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_level: { Args: { xp: number }; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_user_xp: {
        Args: { user_id_param: string; xp_amount: number }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
