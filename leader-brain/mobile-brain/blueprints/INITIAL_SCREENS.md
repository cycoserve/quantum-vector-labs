# Mobile Blueprint: Initial Screen Generation

## 1. Splash Screen (`app/onboarding/splash.tsx`)
- Full screen background: `bg-[#010918]`
- Centered: QVL Icon (from public/logo-icon.svg)
- Text: "Quantum Vector Labs" in Space Grotesk (bold)
- Subtext: "Neural Horizon" (cyan-blue)
- Fade-in animation (0.8s)

## 2. Onboarding Carousel (`app/onboarding/slides.tsx`)
- **Slide 1**: 
  - Image: Centralized Brain Icon
  - Title: "The Neural Horizon"
  - Body: Deploy and serve GenAI models globally without infrastructure complexity.
- **Slide 2**: 
  - Image: Network of AI nodes
  - Title: "Context-Aware Reasoning"
  - Body: Use Leader Brain to give your agents persistent memory and human-readable context.
- **Slide 3**: 
  - Image: Global map with glowing markers
  - Title: "Planetary Scale"
  - Body: Manage billions of inferences with the same infrastructure that powers QVL.
  - Button: "Get Started" -> `(auth)/login`

## 3. Login Page (`app/(auth)/login.tsx`)
- Glass-panel container: `mx-4 my-auto p-8 bg-[#ffffff10] border-[#ffffff20]`
- Title: "Welcome Back"
- Form:
  - Input: Email (placeholder: "name@company.com")
  - Input: Password (secureEntry: true)
  - Button: "Sign In" (Cyan-blue)
- OAuth Section:
  - Text: "Or continue with"
  - Row: [Google Icon Button, GitHub Icon Button]
- Footer: "Don't have an account? Sign Up"

## 4. Home / Dashboard (`app/(tabs)/index.tsx`)
- Header: Minimalist bar with logo and profile avatar.
- Main: 
  - Card 1: Greeting + Current Plan (Free/Pro/Enterprise)
  - Card 2: Quick actions (New Dream, View States)
  - Card 3: Analytics preview (Simple bar chart showing usage)
- Tab Bar: 
  - Icons: Dashboard (Layout), Account (User), Settings (Settings)
