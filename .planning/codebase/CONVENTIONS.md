# Conventions

## Coding Style
- **Language:** TypeScript
- **Styling:** NativeWind utility classes (TailwindCSS) instead of `StyleSheet.create`.
- **Formatting:** Prettier with Tailwind plugin (`prettier-plugin-tailwindcss`).

## File Naming
- React components/Screens: PascalCase with `.tsx` extension, or specific routing conventions like `[id].tsx`, `_layout.tsx`, `index.tsx`.
- Utilities/Constants: camelCase or kebab-case with `.ts` extension.

## Architecture Patterns
- Components rely on pre-defined design tokens in `src/constants/` to maintain a consistent UI theme via NativeWind.
