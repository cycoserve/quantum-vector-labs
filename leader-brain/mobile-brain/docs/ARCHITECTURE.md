# Mobile App Architecture — Quantum Vector Labs

## Core Stack
- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind for React Native)
- **Navigation**: Expo Router (File-based navigation)
- **Icons**: Lucide React Native
- **Storage**: Expo SecureStore (for auth tokens)
- **Auth**: Stack Auth (Modern, hooks-based SDK)
- **Database**: Neon DB (Future persistence for MVP)
- **AI**: Vultr Inference (via web API routes or direct call)

## Project Structure (Blueprint)
- `app/` (Expo Router directory)
  - `(auth)/` - Login, Signup
  - `(tabs)/` - Dashboard, Settings
  - `onboarding/` - Splash, Three-slide Get Started
- `components/` - Themed buttons, inputs, glass-panels (simulated)
- `hooks/` - `useAuth`, `useAI`
- `constants/` - Colors (Primary: #20d3ee, Bg: #010918)
