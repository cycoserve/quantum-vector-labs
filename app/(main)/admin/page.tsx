'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

type DreamType = 'system' | 'feature' | 'bug' | 'strategy';
type DreamPriority = 'critical' | 'high' | 'medium' | 'low';

interface DreamForm {
  content: string;
  type: DreamType;
  priority: DreamPriority;
  tags: string;
}

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const [form, setForm] = useState<DreamForm>({
    content: '',
    type: 'feature',
    priority: 'medium',
    tags: '',
  });

  // Tags pill state
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const syncTags = (tags: string[]) => {
    setTagList(tags);
    setForm((f) => ({ ...f, tags: tags.join(', ') }));
  };

  const addTag = (raw: string) => {
    const value = raw.trim().toLowerCase().replace(/^,+|,+$/g, '');
    if (!value) return;
    const newTags = [...new Set([...tagList, value])];
    syncTags(newTags);
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    syncTags(tagList.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === 'Backspace' && tagInput === '' && tagList.length > 0) {
      syncTags(tagList.slice(0, -1));
    }
  };

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitResult, setSubmitResult] = useState<Record<string, unknown> | null>(null);

  const [brainState, setBrainState] = useState<Record<string, unknown> | null>(null);
  const [brainStateStatus, setBrainStateStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  // Auth gate
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth');
    }
  }, [isLoading, isAuthenticated, router]);

  // Fetch brain state on mount
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchBrainState = async () => {
      setBrainStateStatus('loading');
      try {
        const res = await fetch('/api/brain/state');
        const data = await res.json();
        setBrainState(data);
        setBrainStateStatus('idle');
      } catch {
        setBrainStateStatus('error');
      }
    };

    fetchBrainState();
  }, [isAuthenticated]);

  const handleSubmitDream = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setSubmitResult(null);

    const tagsArray = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/brain/dream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: form.type,
          content: form.content,
          priority: form.priority,
          tags: tagsArray,
        }),
      });

      const data = await res.json();
      setSubmitResult(data as Record<string, unknown>);
      setSubmitStatus('success');
      setForm({ content: '', type: 'feature', priority: 'medium', tags: '' });
      setTagList([]);
      setTagInput('');
    } catch {
      setSubmitStatus('error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary animate-pulse font-mono text-sm tracking-widest uppercase">
          Authenticating...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen px-4 py-16 sm:px-8 lg:px-16">
      {/* Page Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-primary font-mono text-xs tracking-widest uppercase">
            Admin Console
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Leader Brain{' '}
          <span className="text-primary text-gradient">Dashboard</span>
        </h1>
        <p className="text-white/50 text-sm font-mono">
          Internal operations interface — restricted access
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl">
        {/* Submit Dream Form */}
        <section className="glass-panel rounded-2xl p-6 card-ring flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.416A2 2 0 0113 21h-2a2 2 0 01-1.494-.684l-.346-.416z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">Submit Dream</h2>
              <p className="text-white/40 text-xs font-mono">Transmit directive to Leader Brain</p>
            </div>
          </div>

          <form onSubmit={handleSubmitDream} className="flex flex-col gap-4">
            {/* Content Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-xs font-mono uppercase tracking-wider">
                Dream Content
              </label>
              <textarea
                required
                rows={5}
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Describe the dream, goal, or directive..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 resize-none focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-colors font-mono"
              />
            </div>

            {/* Type + Priority row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-mono uppercase tracking-wider">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as DreamType }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-colors font-mono appearance-none cursor-pointer"
                >
                  <option value="system" className="bg-[#010918]">System</option>
                  <option value="feature" className="bg-[#010918]">Feature</option>
                  <option value="bug" className="bg-[#010918]">Bug</option>
                  <option value="strategy" className="bg-[#010918]">Strategy</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-mono uppercase tracking-wider">
                  Priority
                </label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as DreamPriority }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-colors font-mono appearance-none cursor-pointer"
                >
                  <option value="critical" className="bg-[#010918]">Critical</option>
                  <option value="high" className="bg-[#010918]">High</option>
                  <option value="medium" className="bg-[#010918]">Medium</option>
                  <option value="low" className="bg-[#010918]">Low</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-xs font-mono uppercase tracking-wider">
                Tags
              </label>
              {/* Pill container — click anywhere to focus the input */}
              <div
                className="flex flex-wrap gap-1.5 min-h-[42px] w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 cursor-text transition-colors focus-within:border-primary/50 focus-within:bg-primary/5"
                onClick={() => tagInputRef.current?.focus()}
              >
                {tagList.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/30 text-primary text-xs font-mono select-none"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                      className="text-primary/50 hover:text-primary transition-colors leading-none"
                      aria-label={`Remove tag ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  ref={tagInputRef}
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v.includes(',')) {
                      v.split(',').forEach((part) => addTag(part));
                    } else {
                      setTagInput(v);
                    }
                  }}
                  onKeyDown={handleTagKeyDown}
                  onBlur={() => { if (tagInput) addTag(tagInput); }}
                  placeholder={tagList.length === 0 ? 'e.g. auth, refactor, performance' : ''}
                  className="flex-1 min-w-[140px] bg-transparent text-white text-sm placeholder-white/20 focus:outline-none font-mono py-0.5"
                />
              </div>
              <p className="text-white/25 text-xs font-mono">
                Press <kbd className="px-1 py-px rounded bg-white/10 text-white/40 text-[10px]">Enter</kbd> or <kbd className="px-1 py-px rounded bg-white/10 text-white/40 text-[10px]">,</kbd> to add a tag
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className="mt-2 w-full py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200
                bg-primary/10 border border-primary/40 text-primary
                hover:bg-primary/20 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(32,211,238,0.2)]
                disabled:opacity-40 disabled:cursor-not-allowed
                active:scale-[0.98]"
            >
              {submitStatus === 'loading' ? (
                <span className="flex items-center justify-center gap-2 font-mono">
                  <span className="w-3 h-3 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
                  Transmitting...
                </span>
              ) : (
                'Send Dream →'
              )}
            </button>

            {/* Submit Feedback */}
            {submitStatus === 'success' && submitResult && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-3">
                <p className="text-emerald-400 text-xs font-mono mb-2 uppercase tracking-wider">
                  ✓ Dream Transmitted
                </p>
                <pre className="text-white/60 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words">
                  {String(JSON.stringify(submitResult, null, 2))}
                </pre>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3">
                <p className="text-red-400 text-xs font-mono uppercase tracking-wider">
                  ✗ Transmission failed — check console for details
                </p>
              </div>
            )}
          </form>
        </section>

        {/* Brain State Panel */}
        <section className="glass-panel rounded-2xl p-6 card-ring flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Brain State</h2>
                <p className="text-white/40 text-xs font-mono">Live cognitive snapshot</p>
              </div>
            </div>

            <button
              onClick={async () => {
                setBrainStateStatus('loading');
                try {
                  const res = await fetch('/api/brain/state');
                  const data = await res.json();
                  setBrainState(data);
                  setBrainStateStatus('idle');
                } catch {
                  setBrainStateStatus('error');
                }
              }}
              className="px-3 py-1.5 text-xs font-mono text-primary/70 border border-primary/20 rounded-md
                hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              ↻ Refresh
            </button>
          </div>

          <div className="flex-1 min-h-0">
            {brainStateStatus === 'loading' && (
              <div className="h-48 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-white/40">
                  <span className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                  <span className="text-xs font-mono">Querying brain state...</span>
                </div>
              </div>
            )}

            {brainStateStatus === 'error' && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3">
                <p className="text-red-400 text-xs font-mono uppercase tracking-wider">
                  ✗ Failed to fetch brain state
                </p>
              </div>
            )}

            {brainStateStatus === 'idle' && brainState !== null && (
              <div className="relative">
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-[10px] font-mono uppercase tracking-wider">Live</span>
                </div>
                <pre className="w-full bg-black/40 border border-white/5 rounded-xl p-4 pt-8 text-xs font-mono text-white/70 overflow-x-auto overflow-y-auto max-h-[520px] leading-relaxed whitespace-pre-wrap break-words">
                  {String(JSON.stringify(brainState, null, 2))}
                </pre>
              </div>
            )}

            {brainStateStatus === 'idle' && brainState === null && (
              <div className="h-48 flex items-center justify-center text-white/30 text-xs font-mono">
                No state data available
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
