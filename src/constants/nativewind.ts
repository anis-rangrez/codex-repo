// src/constants/nativewind.ts
// NativeWind utility classes mapped to design tokens
// Use these for type-safe NativeWind className strings

/**
 * Viblink NativeWind Class Helpers
 *
 * These provide type-safe access to our design tokens via NativeWind classes.
 * Use with StyleSheet for complex styles, NativeWind for layout/composition.
 *
 * @example
 * ```tsx
 * import { tw } from '@/constants/nativewind';
 *
 * <View className={tw.surface.card}>
 *   <Text className={tw.text.primary}>Hello</Text>
 * </View>
 * ```
 */

// ===========================================
// SURFACE CLASSES (60% - Backgrounds)
// ===========================================
export const surfaces = {
  // Light mode classes
  light: {
    background: "bg-light-background", // #F9FAFB
    surface: "bg-light-surface", // #FFFFFF
    surfaceSecondary: "bg-light-surface-secondary", // #F3F4F6
    card: "bg-light-card", // #FFFFFF
    input: "bg-light-input", // #F3F4F6
    modal: "bg-light-modal", // #FFFFFF
    post: "bg-light-post", // #FFFFFF
  },
  // Dark mode classes
  dark: {
    background: "bg-dark-background", // #09090B
    surface: "bg-dark-surface", // #18181B
    surfaceSecondary: "bg-dark-surface-secondary", // #27272A
    card: "bg-dark-card", // #18181B
    input: "bg-dark-input", // #27272A
    modal: "bg-dark-modal", // #121214
    post: "bg-dark-post", // #272727
  },
} as const;

// ===========================================
// TEXT CLASSES (30% - Typography)
// ===========================================
export const text = {
  // Light mode classes
  light: {
    primary: "text-light-text", // #111216
    secondary: "text-light-text-secondary", // #4A4C55
    tertiary: "text-light-text-tertiary", // #7B7D87
    muted: "text-light-text-muted", // #7B7D87
  },
  // Dark mode classes
  dark: {
    primary: "text-dark-text", // #FFFFFF
    secondary: "text-dark-text-secondary", // #9DA0B0
    tertiary: "text-dark-text-tertiary", // #5D5F6D
    muted: "text-dark-text-muted", // #5D5F6D
  },
} as const;

// ===========================================
// ACCENT CLASSES (10% - Brand)
// ===========================================
export const accents = {
  primary: "bg-accent", // #6C47FF
  primaryText: "text-accent",
  magenta: "bg-accent-magenta", // #FF2DF4
  magentaText: "text-accent-magenta",
  gradient: "bg-gradient-brand", // Custom utility in global.css
  gradientText: "text-gradient-brand", // Custom utility in global.css
} as const;

// ===========================================
// BORDER CLASSES
// ===========================================
export const borders = {
  light: {
    default: "border-light-border", // #DCDCE0
    active: "border-light-border-active", // #6C47FF
  },
  dark: {
    default: "border-dark-border", // #27272F
    active: "border-dark-border-active", // #6C47FF
  },
} as const;

// ===========================================
// FONT CLASSES
// ===========================================
export const fonts = {
  regular: "font-sans", // PlusJakartaSans-Regular
  medium: "font-sans-medium", // PlusJakartaSans-Medium
  semibold: "font-sans-semibold", // PlusJakartaSans-SemiBold
  bold: "font-sans-bold", // PlusJakartaSans-Bold
  extrabold: "font-sans-extrabold", // PlusJakartaSans-ExtraBold
} as const;

// ===========================================
// SIZE CLASSES
// ===========================================
export const sizes = {
  text: {
    xxs: "text-xxs", // 10px
    xs: "text-xs", // 12px
    sm: "text-sm", // 14px
    base: "text-base", // 16px
    lg: "text-lg", // 18px
    xl: "text-xl", // 20px
    "2xl": "text-2xl", // 24px
    "3xl": "text-3xl", // 32px
    display: "text-display", // 40px
    hero: "text-hero", // 48px
  },
  spacing: {
    0: "p-0 m-0",
    1: "p-1 m-1", // 4px
    2: "p-2 m-2", // 8px
    3: "p-3 m-3", // 12px
    4: "p-4 m-4", // 16px
    5: "p-5 m-5", // 20px
    6: "p-6 m-6", // 24px
    8: "p-8 m-8", // 32px
    10: "p-10 m-10", // 40px
    12: "p-12 m-12", // 48px
  },
} as const;

// ===========================================
// COMMON COMPONENT PATTERNS
// ===========================================

/**
 * Pre-composed class combinations for common UI patterns
 * These combine multiple tokens into reusable patterns
 */
export const patterns = {
  // Card patterns
  cardLight: "bg-light-card border border-light-border rounded-2xl p-5",
  cardDark:
    "bg-dark-card border border-dark-border border-t-white/5 rounded-2xl p-5",

  // Button patterns
  buttonPrimary: "bg-accent rounded-xl px-4 py-3",
  buttonSecondaryLight:
    "bg-light-surface-secondary border border-light-border rounded-xl px-4 py-3",
  buttonSecondaryDark:
    "bg-dark-surface-secondary border border-dark-border border-t-white/5 rounded-xl px-4 py-3",

  // Input patterns
  inputLight:
    "bg-light-input border border-light-border rounded-xl px-4 py-3 text-light-text",
  inputDark:
    "bg-dark-input border border-dark-border border-t-white/5 rounded-xl px-4 py-3 text-dark-text",

  // Container patterns
  screenLight: "flex-1 bg-light-background",
  screenDark: "flex-1 bg-dark-background",

  // Text patterns
  headingLight: "text-light-text font-sans-bold text-2xl",
  headingDark: "text-dark-text font-sans-bold text-2xl",

  bodyLight: "text-light-text-secondary font-sans text-base leading-relaxed",
  bodyDark: "text-dark-text-secondary font-sans text-base leading-relaxed",

  captionLight: "text-light-text-tertiary font-sans text-sm",
  captionDark: "text-dark-text-tertiary font-sans text-sm",
} as const;

// ===========================================
// THEME-AWARE HELPER
// ===========================================

/**
 * Get theme-appropriate classes based on colorScheme
 *
 * @example
 * ```tsx
 * const isDark = colorScheme === 'dark';
 * <View className={getThemeClass(isDark, 'card')}>
 * ```
 */
export const getThemeClass = (
  isDark: boolean,
  type:
    | "background"
    | "surface"
    | "card"
    | "input"
    | "text"
    | "textSecondary"
    | "border",
): string => {
  const theme = isDark ? "dark" : "light";

  const classMap = {
    background: isDark ? surfaces.dark.background : surfaces.light.background,
    surface: isDark ? surfaces.dark.surface : surfaces.light.surface,
    card: isDark ? surfaces.dark.card : surfaces.light.card,
    input: isDark ? surfaces.dark.input : surfaces.light.input,
    text: isDark ? text.dark.primary : text.light.primary,
    textSecondary: isDark ? text.dark.secondary : text.light.secondary,
    border: isDark ? borders.dark.default : borders.light.default,
  };

  return classMap[type];
};

// ===========================================
// COMBINED EXPORT
// ===========================================
export const tw = {
  surfaces,
  text,
  accents,
  borders,
  fonts,
  sizes,
  patterns,
  getThemeClass,
} as const;
