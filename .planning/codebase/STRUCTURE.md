# Directory Layout

```
/
├── src/
│   ├── app/           # Expo Router screens and layouts
│   │   ├── _layout.tsx # Root layout
│   │   └── index.tsx   # Entry screen
│   ├── constants/     # Design system and theme tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── nativewind.ts
│   └── global.css     # Global Tailwind CSS imports
├── assets/            # Static files (images, fonts)
├── .expo/             # Expo generated files
├── .planning/         # GSD workflow artifacts
├── package.json       # Dependencies
└── bun.lock           # Package lockfile
```

## Key Locations
- **Entry point:** `src/app/_layout.tsx` is the router root.
- **Styling Config:** `tailwind.config.js` and `src/global.css`.
