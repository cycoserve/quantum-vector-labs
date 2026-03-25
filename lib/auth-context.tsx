'use client';

/**
 * Stack Auth context — thin wrapper that re-exports Stack's
 * hooks/types so the rest of the app can stay largely the same.
 *
 * For reading the current user use `useUser()` from @stackframe/stack directly,
 * or use the `useAuth()` convenience hook below.
 */

import { useUser, useStackApp } from '@stackframe/stack';

export type OAuthProviderType = 'google' | 'github';

// Re-export so existing imports in the app keep working
export { useUser };

/**
 * Convenience hook that mirrors the previous `useAuth()` shape
 * consumed by AuthForm.tsx and other components.
 */
export function useAuth() {
  const user = useUser();
  const app = useStackApp();

  const isLoading = false; // Stack handles loading state internally via Suspense
  const isAuthenticated = !!user;

  const signIn = async (email: string, password: string) => {
    await app.signInWithCredential({ email, password });
  };

  const signUp = async (email: string, password: string, _displayName?: string) => {
    // Stack's signUpWithCredential only accepts email + password + redirect options.
    // displayName can be set post-signup via user.update({ displayName }).
    await app.signUpWithCredential({ email, password });
  };

  const signInWithProvider = async (provider: OAuthProviderType) => {
    await app.signInWithOAuth(provider);
  };

  const signOut = async () => {
    if (user) {
      await user.signOut();
    }
  };

  const refreshUser = async () => {
    // Stack keeps user state reactive — no manual refresh needed
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
    refreshUser,
  };
}

export default useAuth;
