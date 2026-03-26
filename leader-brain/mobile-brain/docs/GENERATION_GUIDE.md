# Mobile App: Generation Guide

## 1. Environment Setup
- Initialize new Expo project: `npx create-expo-app QVLMobile --template tabs`
- Install dependencies:
  - `nativewind`, `tailwindcss`
  - `lucide-react-native`
  - `@stack-auth/react-native`
  - `expo-secure-store`
  - `expo-router`

## 2. Global Styling (Tailwind Config)
- Extend Tailwind colors to include:
  - `primary`: `#20D3EE`
  - `space-blue`: `#010918`
  - `glass-bg`: `rgba(255, 255, 255, 0.05)`

## 3. Screen Generation Order
1. **Onboarding Stack**: Splash -> Slides (3)
2. **Auth Stack**: Login (Email/Password + OAuth)
3. **Main Stack (Tabs)**:
   - Dashboard (Home)
   - Account (Profile)
   - Settings (General & Theme)

## 4. Branding
- Use `public/logo-icon.svg` from the web project for the mobile splash and header.
- Maintain the "Cyan on Space Blue" aesthetic for all buttons and accents.
