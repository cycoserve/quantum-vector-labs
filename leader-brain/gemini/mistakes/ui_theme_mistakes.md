# Mistakes - 2026-03-25

## 1. Hardcoded Dark Classes
- **Description:** Some components were using hardcoded dark classes (`bg-black/20`, `text-slate-400`) instead of being theme-aware.
- **Impact:** In light mode, text and backgrounds were nearly invisible or poorly contrasted.
- **Correction:** Replaced hardcoded classes with theme-aware alternatives (`text-slate-500 dark:text-slate-400`, `bg-slate-100 dark:bg-white/5`).

## 2. Fullscreen Overflow
- **Description:** Initial fullscreen mode only changed the position to `fixed inset-0` but did not lock the body scroll.
- **Impact:** Users could still scroll the background content while in fullscreen mode.
- **Correction:** Implemented a `useEffect` hook in `Sidebar.tsx` to toggle `document.body.style.overflow = "hidden"` when in fullscreen.

## 3. Background Transparency
- **Description:** Mobile menu was set to `bg-transparent` which made it difficult to read on varied page content.
- **Impact:** Poor accessibility and UX.
- **Correction:** Changed to solid `bg-white` and `bg-slate-950` with proper borders.
