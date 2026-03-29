# Mistakes Report — UI Theme Integration

## Incident: Broken Theme Switching in User Settings
**Date:** 2026-03-29
**Agent:** Gemini CLI

### Description of Error
During the implementation of the `app/(user)` route group and the settings page, I hardcoded dark-mode specific Tailwind classes (`bg-black`, `text-white`, `text-slate-400`) instead of using the semantic theme tokens defined in `globals.css` (`bg-background`, `text-foreground`, `text-muted`).

### Impact
- The `/settings` page was permanently black even when the user system preference was set to Light mode.
- The `next-themes` transition logic was bypassed, leading to a broken UI state where text was invisible or colors were mismatched in Light mode.
- The "Back" button and other navigation elements did not respect the theme.

### Root Cause
- **Assumption Overload:** Assumed the project was "forced dark mode" based on an outdated line in `PROJECT_SUMMARY.md`, ignoring the presence of `next-themes` and a complex `globals.css` with light mode support.
- **Surgical Laziness:** Used hardcoded hex-like classes (`bg-black`) for speed instead of adhering to the established design system tokens.

### Corrective Actions
1. **Layout Fix:** Updated `app/(user)/layout.tsx` to use `bg-background` and `text-foreground`.
2. **Component Refactor:** Updated `app/(user)/settings/page.tsx` to use semantic classes (`text-muted`, `text-foreground`, `glass-panel`) and CSS variables (`var(--surface)`).
3. **Audit:** Verified `globals.css` variable mappings to ensure `text-muted` and `border-surface-border` provide sufficient contrast in both modes.

### Lessons Learned
- Always verify the `ThemeProvider` configuration in `Providers.tsx` before assuming a single-theme project.
- Always check `globals.css` for custom semantic tokens (like `--surface`) before using Tailwind's default color palette.
- Documentation (`PROJECT_SUMMARY.md`) can lag behind implementation; the code (CSS/Providers) is the source of truth for current state.
