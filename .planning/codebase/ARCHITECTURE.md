# Architecture

## Pattern
- **Architectural Pattern:** Filesystem-based Routing (Expo Router)
- **Paradigm:** Component-driven, React Native

## Data Flow
- Standard unidirectional React data flow.
- No global state management library is currently configured.

## Component Hierarchy
- `src/app/_layout.tsx`: Root Layout
- `src/app/index.tsx`: Landing Page / Initial Route

## Separation of Concerns
- Minimal at present. UI constants (colors, typography, etc.) are separated in `src/constants/`.
- App screens are placed in `src/app/`.
