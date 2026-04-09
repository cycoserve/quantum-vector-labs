'use client';

import React, { useState } from 'react';
import { useStackApp } from '@stackframe/stack';
import { Mail, Lock, User, Github, Loader2, LogIn, ShieldCheck, HelpCircle, UserPlus } from 'lucide-react';

type AuthView = 'login' | 'signup';
type OAuthProviderType = 'google' | 'github';

interface OAuthProvider {
  id: OAuthProviderType;
  name: string;
  icon: React.ReactNode;
}

const oauthProviders: OAuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: <Github className="w-4 h-4" />,
  },
];

export default function AuthForm() {
  const app = useStackApp();

  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);
    try {
      if (view === 'login') {
        const result = await app.signInWithCredential({ email, password });
        if (result.status === 'error') {
          setError(result.error?.message || 'Invalid email or password.');
        }
      } else {
        const result = await app.signUpWithCredential({ email, password });
        if (result.status === 'error') {
          setError(result.error?.message || 'Could not create account.');
        } else {
          setSuccessMessage('Account created! Please check your email to verify your account.');
          setView('login');
        }
      }
    } catch (err: unknown) {
      setError((err as Error)?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignIn = async (provider: OAuthProviderType) => {
    setError(null);
    try {
      await app.signInWithOAuth(provider);
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Failed to sign in with provider.');
    }
  };

  const toggleView = () => {
    setView(view === 'login' ? 'signup' : 'login');
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="w-full">

      {/* Logo + Title */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center size-9 bg-primary/10 border border-primary/25 rounded-xl mb-2.5 glow-border">
          <svg className="text-primary size-5" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase mb-0.5">
          {view === 'login' ? 'Cy Portal' : 'Create Account'}
        </h1>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {view === 'login' ? 'Sign in to your account' : 'Join the quantum revolution'}
        </p>
      </div>

      {/* Glass Panel */}
      <div className="glass-panel rounded-2xl p-4 border-t-2 border-t-primary/40">

        {/* Tab Switcher */}
        <div className="flex gap-3 mb-4 border-b border-slate-200 dark:border-white/5 pb-2.5">
          <button
            type="button"
            onClick={() => setView('login')}
            className={`text-[11px] font-bold pb-1.5 px-1 transition-colors ${
              view === 'login'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setView('signup')}
            className={`text-[11px] font-bold pb-1.5 px-1 transition-colors ${
              view === 'signup'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* OAuth Buttons — side by side */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {oauthProviders.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => handleOAuthSignIn(provider.id)}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {provider.icon}
              <span>{provider.name}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-white/10" />
          </div>
          <div className="relative flex justify-center text-[10px]">
            {/* Uses bg-[--surface] which is CSS var aware for light/dark */}
            <span className="bg-[var(--surface)] px-3 text-slate-500 dark:text-slate-400 rounded">
              or continue with email
            </span>
          </div>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="mb-3 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[11px]">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-3 p-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-[11px]">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Username — signup only */}
          {view === 'signup' && (
            <div>
              <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300 block mb-1 ml-0.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <User className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full terminal-input rounded-lg py-2.5 pl-9 pr-3 text-xs placeholder:text-slate-400 dark:placeholder:text-primary/20 focus:ring-0"
                  placeholder="Choose a username"
                  minLength={3}
                  maxLength={30}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300 block mb-1 ml-0.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full terminal-input rounded-lg py-2.5 pl-9 pr-3 text-xs placeholder:text-slate-400 dark:placeholder:text-primary/20 focus:ring-0"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300 ml-0.5">
                Password
              </label>
              {view === 'login' && (
                <a href="#" className="text-[11px] text-slate-400 dark:text-slate-500 hover:text-primary transition-colors">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                <Lock className="w-3.5 h-3.5" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full terminal-input rounded-lg py-2.5 pl-9 pr-3 text-xs placeholder:text-slate-400 dark:placeholder:text-primary/20 focus:ring-0"
                placeholder={view === 'signup' ? 'Create a password (8+ chars)' : 'Enter your password'}
                required
                minLength={8}
              />
            </div>
          </div>

          {/* Remember me — login only */}
          {view === 'login' && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="size-3.5 rounded border-primary/20 bg-slate-50 dark:bg-black/40 text-primary focus:ring-primary/20 focus:ring-offset-0"
              />
              <label htmlFor="remember" className="text-[11px] text-slate-500 dark:text-slate-400 cursor-pointer">
                Remember me
              </label>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-white text-[#010918] font-black py-2.5 rounded-lg shadow-[0_0_16px_rgba(168,85,247,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {view === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              <>
                {view === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                {view === 'login' ? 'Sign In' : 'Create Account'}
              </>
            )}
          </button>
        </form>

        {/* Toggle View */}
        <div className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
          {view === 'login' ? (
            <>
              No account?{' '}
              <button type="button" onClick={toggleView} className="text-primary hover:underline focus:outline-none font-medium">
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" onClick={toggleView} className="text-primary hover:underline focus:outline-none font-medium">
                Sign in
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-4 flex justify-center gap-6">
        <a href="#" className="text-[11px] text-slate-400 dark:text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Privacy
        </a>
        <a href="#" className="text-[11px] text-slate-400 dark:text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          Help
        </a>
      </div>

      {/* Brand tag — bottom-left corner, desktop only */}
      <div className="fixed bottom-6 left-6 hidden lg:block pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-primary/20" />
          <p className="text-[9px] font-mono text-slate-400 dark:text-primary/30 uppercase tracking-[0.3em]">
            CycoServe Labs
          </p>
        </div>
      </div>
    </div>
  );
}
