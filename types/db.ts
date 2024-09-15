import { Database } from "./supabase";

export type POLL = Database['public']['Tables']['polls']['Row']
export type VOTE = Database['public']['Tables']['votes']['Row']