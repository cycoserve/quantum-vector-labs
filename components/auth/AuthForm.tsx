'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Mail, Lock, User, Github, Loader2 } from 'lucide-react';

type AuthView = 'login' | 'signup';

type OAuthProviderType = 'google' | 'github' | 'twitter' | 'facebook' | 'discord';

interface OAuthProvider {
  id: OAuthProviderType;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const oauthProviders: OAuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
    color: 'hover:bg-white/10',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: <Github className="w-5 h-5" />,
    color: 'hover:bg-white/10',
  },
];

export default function AuthForm() {
  const router = useRouter();
  const { signIn, signUp, signInWithProvider, isLoading } = useAuth();
  
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
        await signIn(email, password);
        router.push('/dashboard');
      } else {
        await signUp(email, password, username);
        setSuccessMessage('Account created! Please check your email to verify your account.');
        setView('login');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignIn = async (provider: OAuthProviderType) => {
    setError(null);
    try {
      await signInWithProvider(provider);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with provider.');
    }
  };

  const toggleView = () => {
    setView(view === 'login' ? 'signup' : 'login');
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo and Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center size-14 bg-primary/10 border border-primary/20 rounded-xl mb-6 glow-border">
          <svg className="text-primary size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter text-white uppercase mb-2">
          {view === 'login' ? 'QVL Portal' : 'Create Account'}
        </h1>
        <p className="text-sm text-slate-400">
          {view === 'login' ? 'Sign in to your account' : 'Join the quantum revolution'}
        </p>
      </div>

      {/* Glass Panel */}
      <div className="glass-panel rounded-2xl p-8 border-t-2 border-t-primary/40">
        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8 border-b border-white/5 pb-4">
          <button
            type="button"
            onClick={() => setView('login')}
            className={`text-sm font-bold pb-2 px-1 transition-colors ${
              view === 'login'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setView('signup')}
            className={`text-sm font-bold pb-2 px-1 transition-colors ${
              view === 'signup'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          {oauthProviders.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => handleOAuthSignIn(provider.id as OAuthProviderType)}
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-white/10 bg-white/5 text-white font-medium transition-all ${provider.color} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {provider.icon}
              <span>Continue with {provider.name}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-deep-space/80 px-4 text-slate-500">or continue with email</span>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username - Only for Signup */}
          {view === 'signup' && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 block ml-1">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full terminal-input rounded-lg py-3.5 pl-10 pr-4 text-sm placeholder:text-primary/20 focus:ring-0"
                  placeholder="Choose a username"
                  required={view === 'signup'}
                  minLength={3}
                  maxLength={30}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 block ml-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full terminal-input rounded-lg py-3.5 pl-10 pr-4 text-sm placeholder:text-primary/20 focus:ring-0"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-300 block ml-1">
                Password
              </label>
              {view === 'login' && (
                <a href="#" className="text-xs text-slate-500 hover:text-primary transition-colors">
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full terminal-input rounded-lg py-3.5 pl-10 pr-4 text-sm placeholder:text-primary/20 focus:ring-0"
                placeholder={view === 'signup' ? 'Create a password' : 'Enter your password'}
                required
                minLength={8}
              />
            </div>
            {view === 'signup' && (
              <p className="text-xs text-slate-500 ml-1">Must be at least 8 characters</p>
            )}
          </div>

          {/* Remember me - Only for Login */}
          {view === 'login' && (
            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="remember"
                className="size-4 rounded border-primary/20 bg-black/40 text-primary focus:ring-primary/20 focus:ring-offset-0"
              />
              <label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer">
                Remember me
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-primary hover:bg-white text-deep-space font-black py-4 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {view === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">login</span>
                {view === 'login' ? 'Sign In' : 'Create Account'}
              </>
            )}
          </button>
        </form>

        {/* Toggle View Link */}
        <div className="mt-6 text-center text-sm text-slate-400">
          {view === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={toggleView}
                className="text-primary hover:underline focus:outline-none"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={toggleView}
                className="text-primary hover:underline focus:outline-none"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-10 flex justify-center gap-8">
        <a href="#" className="text-xs text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">shield</span>
          Privacy & Security
        </a>
        <a href="#" className="text-xs text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">help</span>
          Help Center
        </a>
      </div>

      {/* Brand Footer */}
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-primary/20"></div>
          <p className="text-[10px] font-mono text-primary/30 uppercase tracking-[0.3em]">Quantum Vector Labs</p>
        </div>
      </div>
    </div>
  );
}
