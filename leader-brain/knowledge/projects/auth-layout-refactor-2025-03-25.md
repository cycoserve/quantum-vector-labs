# Auth Layout Refactor — Session Report

## Project Overview
- **Project Name**: Quantum Vector Labs — Auth Layout Refactor
- **Purpose**: Fix the dark/light mode rendering on the Login and Sign Up pages, introduce a proper `(auth)` route group layout that excludes Header and Footer, and make the auth form more compact and vertically-fitting
- **Stack**: Next.js 16 App Router, Tailwind CSS, next-themes, Supabase Auth
- **Architecture Type**: Next.js App Router with route groups

## Technology Stack
- **Frontend**: Next.js 16 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth + DB)
- **Authentication**: Supabase OAuth (Google, GitHub) + email/password
- **Theme**: next-themes with `attribute="class"` strategy

---

## Changes Made

### 1. Root Layout Stripped to a Pure Shell
- **File**: `app/layout.tsx`
- **Before**: Root layout contained `<Header>`, `<Footer>`, `<BackgroundLines>` — making it impossible to exclude them from auth pages via route groups alone
- **After**: Root layout is now a minimal `<html>/<body>` + `<Providers>` + font shell only. No UI chrome.

### 2. `(main)` Route Group Created
- **File**: `app/(main)/layout.tsx` *(new)*
- Provides `<BackgroundLines>`, `<Header>`, `<Footer>`, and the `md:px-4` content wrapper
- All main pages moved here: `page.tsx`, `chat/`, `learn/`, `pricing/`, `admin/`

### 3. `(auth)` Route Group Layout Fixed
- **File**: `app/(auth)/layout.tsx`
- **Before**: Incorrectly re-declared `<html>/<body>` tags (would cause double shell in Next.js App Router)
- **After**: Minimal `<>{children}</>` pattern — inherits `<html>/<body>` from root, exports metadata, no Header/Footer

### 4. Dark/Light Mode Fixed in AuthForm
- **File**: `components/auth/AuthForm.tsx`
- **Key Fix**: The "or continue with email" divider span previously used hardcoded `bg-[#f4f7fb] dark:bg-[#020617]` which caused a background mismatch. Replaced with `bg-[var(--surface)]` — a CSS custom property that resolves correctly in both modes.
- **OAuth buttons**: Added explicit `bg-white dark:bg-white/5` + `text-slate-700 dark:text-slate-200` for correct contrast in both modes.

### 5. CSS Variable Refinement
- **File**: `app/globals.css`
- Updated `--surface` values:
  - Light: `#f8fafc` (matches white/80 glass panel over `#f4f7fb` background)
  - Dark: `#020d1f` (matches space-blue/70 glass panel over `#010918` background)

### 6. Compact Auth UI
- **Files**: `app/(auth)/auth/page.tsx`, `components/auth/AuthForm.tsx`
- Max-width: `max-w-md` → `max-w-sm`
- All internal spacings reduced (`p-5→p-4`, `mb-5→mb-4`, `py-3→py-2.5`)
- Text sizes: `text-sm` → `text-xs`/`text-[11px]` throughout
- OAuth buttons: stacked full-width → **2-column grid side by side**
- Password hint moved into placeholder. Label shortened.
- Footer links condensed from 3-4 words to 1 word each

---

## Architectural Decisions

- **Route Groups for layout isolation**: The correct Next.js App Router pattern is to use `(group)` folders. The group itself doesn't affect URL structure. By splitting into `(auth)` and `(main)`, layouts are fully isolated — auth pages have no chrome, main pages have full chrome. Root layout stays as a pure HTML shell.

- **CSS Custom Properties for theme-aware spans**: Inline spans that must match a backdrop (like a divider label) should use `var(--surface)` rather than hardcoded color values. Hardcoded values break when the actual background is slightly different (e.g., blurred glass panels).

- **Avoid double `<html>/<body>` in nested layouts**: In Next.js App Router, only the root layout should declare `<html>` and `<body>`. Nested layouts within route groups must NOT re-declare these, or they produce invalid HTML and hydration mismatches.

---

## Successful Patterns

- **`(main)` layout shell pattern**: Having a dedicated group for the "chrome" pages (Header + Footer) and a separate group for "naked" pages (auth, landing funnels, etc.) is clean and scalable. Adding a new naked page just means placing it in the right group.
- **`bg-[var(--surface)]` for blended elements**: Any element that needs to visually "sit on" the surface (like a divider label, tooltip, etc.) should use the CSS var rather than a hardcoded color. This ensures correctness across both themes.

---

## Mistakes to Avoid

- **Don't put `<html>/<body>` in non-root segment layouts**: The `(auth)/layout.tsx` originally had this and would have caused hydration errors. Only `app/layout.tsx` should declare HTML structure.
- **Don't rely on hardcoded bg colors for divider labels**: When glass/blurred panels are in play, the actual rendered color doesn't match any single hex value. CSS vars are the right solution.
- **Don't bake chrome into the root layout when route groups are needed**: If any page in the app needs to omit the global Header/Footer, the chrome must be in a sub-layout (e.g., `(main)/layout.tsx`), not the root.

---

## Future Improvements

- **Auth page should handle redirect if already logged in**: Currently the auth page has no early-exit for already-authenticated users. An `useEffect` + `router.replace('/dashboard')` guard should be added.
- **Theme toggle on auth page**: The auth page has no way to switch theme. A small floating theme toggle button would improve the experience.
- **Supabase session error handling**: The catch blocks in `AuthForm.tsx` use generic error messages. Mapping Supabase error codes to user-friendly copy would improve UX.

---

*Entry generated by The Leader Brain system*
*Date: 2025-03-25*
*Session: Auth Layout + Dark/Light Mode Fix*
