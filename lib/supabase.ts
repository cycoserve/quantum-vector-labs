import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export type AuthProvider = 'email' | 'google' | 'github' | 'twitter' | 'facebook' | 'discord';

export type OAuthProviderType = 'google' | 'github' | 'twitter' | 'facebook' | 'discord';

export type EmailProvider = 'email';

export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
    provider?: string;
  };
  app_metadata?: {
    provider?: string;
  };
}

export interface SignUpCredentials {
  email: string;
  password: string;
  username: string;
  options?: {
    data?: {
      username: string;
      full_name?: string;
    };
    emailRedirectTo?: string;
  };
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export const signUp = async (credentials: SignUpCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
        full_name: credentials.username,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
};

export const signIn = async (credentials: SignInCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) throw error;
  return data;
};

export const signInWithOAuth = async (provider: OAuthProviderType) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user as AuthUser;
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/update-password`,
  });

  if (error) throw error;
  return data;
};

export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
  return data;
};
