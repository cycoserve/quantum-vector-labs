# Dream: Auth Layout Refactor + Dark/Light Mode Fix

**Dream ID:** dream_auth_layout_fix  
**Status:** Pending  
**Priority:** High  
**Date Created:** 2026-03-24  
**Assigned To:** Next available Code Agent  

---

## 🎯 Goal

Refactor the Login/Signup auth page to:
1. Live inside a Next.js Route Group `(auth)` with its **own isolated layout** (no Header, no Footer)
2. Fix all **dark/light mode** rendering issues currently broken by hardcoded dark-only styles
3. Make the form **more vertically compact** so it fits the viewport better without scrolling

---

## 📂 Affected Files

| File | Action |
|------|--------|
| `app/auth/page.tsx` | DELETE — move contents to new location |
| `app/(auth)/auth/page.tsx` | CREATE — new route group page (URL stays `/auth`) |
| `app/(auth)/layout.tsx` | CREATE — auth-only layout without Header/Footer |
| `components/auth/AuthForm.tsx` | MODIFY — fix dark/light mode + compact spacing |
| `app/globals.css` | MODIFY — add `.terminal-input` dark/light CSS variables |

---

## 🗂️ Step 1 — Create the `(auth)` Route Group Layout

**File to create:** `app/(auth)/layout.tsx`

This layout wraps the auth pages WITHOUT the `<Header>`, `<Footer>`, or `<BackgroundLines>` from the root layout. It still needs `<Providers>` for ThemeProvider + AuthProvider.

```tsx
// app/(auth)/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sign In | Quantum Vector Labs",
  description: "Sign in or create your Quantum Vector Labs account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

> ⚠️ IMPORTANT: This layout re-declares `<html>` and `<body>` because Next.js Route Group layouts that are NESTED under the root layout do NOT re-declare them. Since `app/(auth)/layout.tsx` is a **sibling parallel layout** under `app/`, it MUST include html+body tags. However if Next.js shows an error about duplicate html/body, the correct approach is to NOT include html/body here and instead use a simple fragment wrapper. Adjust accordingly based on error output.
>
> **Alternative simpler approach if html/body causes issues:**
> ```tsx
> export default function AuthLayout({ children }: { children: React.ReactNode }) {
>   return <>{children}</>;
> }
> ```
> The key requirement is: NO `<Header />`, NO `<Footer />`, NO `<BackgroundLines />`.

---

## 🗂️ Step 2 — Create the New Auth Page

**File to create:** `app/(auth)/auth/page.tsx`  
**File to delete:** `app/auth/page.tsx`

The URL `/auth` is preserved because the route group `(auth)` folder name is parenthesized (invisible to router), and the `auth/` subfolder continues to map to `/auth`.

Remove the inline `<style jsx global>` block entirely — those styles are now handled via Tailwind `dark:` utilities and globals.css.

```tsx
// app/(auth)/auth/page.tsx
'use client';

import AuthForm from '@/components/auth/AuthForm';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-[#010918] font-display text-slate-800 dark:text-slate-100 flex items-center justify-center overflow-hidden relative">
      {/* Background Effects — dark mode only */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] hidden dark:block neural-core-sphere"></div>
        <div className="absolute inset-0 neural-grid opacity-10 dark:opacity-20 [transform:rotateX(60deg)_translateY(-100px)]"></div>
        <div className="absolute top-1/4 left-1/4 size-1 bg-primary rounded-full blur-[2px] dark:opacity-100 opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 size-1 bg-primary rounded-full blur-[2px] dark:opacity-100 opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/2 size-1.5 bg-primary rounded-full blur-[3px] dark:opacity-100 opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6 py-8">
        <AuthForm />
      </div>
    </div>
  );
}
```

---

## 🗂️ Step 3 — Fix `AuthForm.tsx` Dark/Light Mode + Compact Layout

**File to modify:** `components/auth/AuthForm.tsx`

### Key changes required:

#### A. Logo/Title section — reduce bottom margin
```tsx
// BEFORE
<div className="text-center mb-10">
// AFTER
<div className="text-center mb-5">
```

#### B. Logo icon container — smaller
```tsx
// BEFORE
<div className="inline-flex items-center justify-center size-14 bg-primary/10 border border-primary/20 rounded-xl mb-6 glow-border">
// AFTER
<div className="inline-flex items-center justify-center size-10 bg-primary/10 border border-primary/20 rounded-xl mb-3 glow-border">
```

#### C. H1 Title — smaller text
```tsx
// BEFORE
<h1 className="text-3xl font-bold tracking-tighter text-white uppercase mb-2">
// AFTER
<h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase mb-1">
```

#### D. Subtitle paragraph
```tsx
// BEFORE
<p className="text-sm text-slate-400">
// AFTER
<p className="text-xs text-slate-500 dark:text-slate-400">
```

#### E. Glass panel — remove hardcoded padding, use compacted values
```tsx
// BEFORE
<div className="glass-panel rounded-2xl p-8 border-t-2 border-t-primary/40">
// AFTER
<div className="glass-panel rounded-2xl p-5 border-t-2 border-t-primary/40">
```

#### F. Tab switcher — reduce bottom margin
```tsx
// BEFORE
<div className="flex gap-4 mb-8 border-b border-white/5 pb-4">
// AFTER
<div className="flex gap-4 mb-5 border-b border-slate-200/50 dark:border-white/5 pb-3">
```

#### G. Tab button inactive state — fix light mode text
```tsx
// BEFORE (both buttons inactive state)
className="text-slate-500 hover:text-slate-300"
// AFTER
className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
```

#### H. OAuth buttons — space-y-3 → space-y-2, mb-6 → mb-4
```tsx
// BEFORE
<div className="space-y-3 mb-6">
// AFTER
<div className="space-y-2 mb-4">
```

#### I. OAuth button styling — add dark: prefix for text
```tsx
// BEFORE
className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-white/10 bg-white/5 text-white font-medium transition-all ${provider.color} disabled:opacity-50 disabled:cursor-not-allowed`}
// AFTER
className={`w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white font-medium transition-all hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed`}
```

> Remove individual `provider.color` hover since we're unifying hover behavior.

#### J. Divider — fix light mode background
```tsx
// BEFORE
<span className="bg-deep-space/80 px-4 text-slate-500">or continue with email</span>
// AFTER
<span className="bg-[#f4f7fb] dark:bg-[#020617] px-4 text-slate-500 dark:text-slate-400 text-xs">or continue with email</span>
```

#### K. Divider margin — reduce
```tsx
// BEFORE
<div className="relative my-6">
// AFTER
<div className="relative my-4">
```

#### L. Form labels — fix light mode text color
```tsx
// BEFORE
<label className="text-xs font-medium text-slate-300 block ml-1">
// AFTER
<label className="text-xs font-medium text-slate-600 dark:text-slate-300 block ml-1">
```
> Apply this change to ALL THREE label elements: Username, Email Address, Password.

#### M. Input fields — fix `.terminal-input` light mode in globals.css

The `.terminal-input` class is defined via inline `<style>` in `app/auth/page.tsx`. After removing that inline style, move a cleaned-up version to `app/globals.css`:

```css
/* In app/globals.css — add to @layer components */

.terminal-input {
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(32, 211, 238, 0.2);
  color: #0f172a;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.terminal-input:focus {
  border-color: #20d3ee;
  outline: none;
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.15);
}

html.dark .terminal-input {
  background: rgba(0, 0, 0, 0.3);
  color: #22D3EE;
}

html.dark .terminal-input:focus {
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.2);
}
```

#### N. Input placeholder — fix light mode
```tsx
// BEFORE
className="w-full terminal-input rounded-lg py-3.5 pl-10 pr-4 text-sm placeholder:text-primary/20 focus:ring-0"
// AFTER
className="w-full terminal-input rounded-lg py-3 pl-10 pr-4 text-sm placeholder:text-slate-400 dark:placeholder:text-primary/20 focus:ring-0"
```
> Apply to ALL THREE inputs: username, email, password.

#### O. Input icons — fix light mode
```tsx
// BEFORE
<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
// AFTER
<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
```

#### P. Password hint text
```tsx
// BEFORE
<p className="text-xs text-slate-500 ml-1">Must be at least 8 characters</p>
// AFTER
<p className="text-xs text-slate-400 dark:text-slate-500 ml-1">Must be at least 8 characters</p>
```

#### Q. Checkbox label
```tsx
// BEFORE
<label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer">
// AFTER
<label htmlFor="remember" className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer">
```

#### R. Submit button — reduce size
```tsx
// BEFORE
className="w-full bg-primary hover:bg-white text-deep-space font-black py-4 rounded-lg ...
// AFTER
className="w-full bg-primary hover:bg-white text-[#010918] font-black py-3 rounded-lg ...
```

> `text-deep-space` is not a valid Tailwind color (not in config) — replace with `text-[#010918]`.

#### S. Toggle view section — reduce top margin
```tsx
// BEFORE
<div className="mt-6 text-center text-sm text-slate-400">
// AFTER
<div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
```

#### T. Footer links — reduce top margin
```tsx
// BEFORE
<div className="mt-10 flex justify-center gap-8">
// AFTER
<div className="mt-5 flex justify-center gap-8">
```

---

## 🗂️ Step 4 — Delete Old Auth Page

After confirming the new `app/(auth)/auth/page.tsx` works correctly, delete:
```
app/auth/page.tsx
```
The `app/auth/` directory can then be removed if empty.

---

## 🗂️ Step 5 — Verify `.glow-border` class

In `app/(auth)/auth/page.tsx` (formerly in the inline styles), `glow-border` is used on the logo icon.  
Check `app/globals.css`. If not defined there, add it to `@layer components`:

```css
.glow-border {
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.3);
}
```

Also add `.neural-core-sphere` and `.neural-grid` to globals.css if they're not already there:

```css
.neural-core-sphere {
  background: radial-gradient(circle at center, #22D3EE 0%, transparent 70%);
  filter: blur(40px);
  opacity: 0.15;
}

.neural-grid {
  background-image: 
    linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

---

## ✅ Acceptance Criteria

- [ ] Visiting `/auth` shows the login/signup page with NO site Header and NO site Footer
- [ ] The URL `/auth` still works (not broken to `/auth/auth`)
- [ ] In **light mode**: form has white/light background, dark text, visible inputs
- [ ] In **dark mode**: form has dark glassmorphic background, cyan-tinted inputs, dark theme
- [ ] The form fits the viewport vertically without needing to scroll on a laptop screen (1366x768)
- [ ] No TypeScript or ESLint compile errors
- [ ] `bg-deep-space` and `text-deep-space` usages are eliminated (not valid Tailwind colors)

---

## ⚠️ Known Pitfalls

1. **Route Group html/body conflict**: If `app/(auth)/layout.tsx` is a nested layout (Next.js App Router nests ALL layouts), it should NOT re-declare `<html>` and `<body>`. Only the root `app/layout.tsx` should. Use a simple fragment or `<div>` wrapper instead.

2. **`bg-deep-space` is undefined**: Not in `tailwind.config.ts`. Replace all usages with `bg-[#010918]` (dark) with `dark:` prefix, or use `bg-background` which uses the CSS variable.

3. **Double-import of globals.css**: If `app/(auth)/layout.tsx` imports `../globals.css` but so does `app/layout.tsx`, there may be style conflicts. Since this is a route group layout (nested), it inherits root layout styles — do NOT re-import globals.css in the auth layout.

4. **`<style jsx>` removal**: The inline `<style jsx global>` block in the old `app/auth/page.tsx` OVERRIDES the `.glass-panel` class from globals.css. Removing it will restore the proper globals.css `.glass-panel` with dark/light mode support.

---

## 📝 Summary

This dream documents a focused refactor of the authentication flow to:
- Use Next.js route groups for layout isolation (no Header/Footer)
- Fix all broken dark/light mode issues caused by hardcoded dark-only class names
- Compact the vertical layout so the form is viewport-friendly

All changes are cosmetic/structural only — no auth logic, API, or Supabase changes required.
