import { createClient } from '@supabase/supabase-js';

// Database types - to be generated from Supabase
export type Database = {
  public: {
    Tables: {
      therapist_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          specialization: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['therapist_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['therapist_profiles']['Insert']>;
      };
      practice_sessions: {
        Row: {
          id: string;
          therapist_id: string;
          client_persona_id: string;
          started_at: string;
          ended_at: string | null;
          transcript: any[];
          feedback: string | null;
          rating: number | null;
        };
        Insert: Omit<Database['public']['Tables']['practice_sessions']['Row'], 'id' | 'started_at'>;
        Update: Partial<Database['public']['Tables']['practice_sessions']['Insert']>;
      };
    };
  };
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Database features will be disabled.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey); 