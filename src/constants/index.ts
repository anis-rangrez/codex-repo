// src/constants/index.ts
// Barrel export for all design tokens

import { DarkColors, LightColors } from "./colors";

export { Colors, DarkColors, LightColors } from "./colors";
export {
  accents,
  borders,
  fonts,
  getThemeClass,
  patterns,
  sizes,
  surfaces,
  text,
  tw,
} from "./nativewind";
export { getShadow, shadows } from "./shadows";
export { spacing } from "./spacing";
export { typography } from "./typography";

// ===========================================
// DESIGN SYSTEM DOCUMENTATION
// ===========================================
/**
 * Viblink Design System
 *
 * ## 30-60-10 Color Rule
 * - 60% → Surfaces (background, cards, inputs)
 * - 30% → Text hierarchy (primary, secondary, tertiary)
 * - 10% → Brand accents (accent purple, magenta)
 *
 * ## Usage Patterns
 *
 * ### With NativeWind (Recommended for layout)
 * ```tsx
 * <View className="bg-dark-background p-4 rounded-lg">
 *   <Text className="text-dark-text text-lg font-sans-bold">
 *     Hello
 *   </Text>
 * </View>
 * ```
 *
 * ### With StyleSheet (For complex styles)
 * ```tsx
 * import { Colors, shadows, spacing } from '@/constants';
 *
 * const styles = StyleSheet.create({
 *   card: {
 *     backgroundColor: Colors.dark.surface,
 *     padding: spacing.md,
 *     ...shadows.md,
 *   },
 * });
 * ```
 *
 * ## Accessibility Notes
 * - accent (#6C47FF) on white: 4.3:1 → AA for large text only
 * - Always use for buttons/headlines, not small body text
 * - All text colors pass WCAG AA minimum on their backgrounds
 */

// ===========================================
// THEME TYPES
// ===========================================
export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  accent: string;
  accentMagenta: string;
}

// ===========================================
// HELPER: Get theme colors
// ===========================================
export const getThemeColors = (mode: ThemeMode): ThemeColors => {
  const colors = mode === "dark" ? DarkColors : LightColors;
  return {
    background: colors.background,
    surface: colors.surface,
    surfaceSecondary: colors.surfaceSecondary,
    textPrimary: colors.textPrimary,
    textSecondary: colors.textSecondary,
    textTertiary: colors.textTertiary,
    border: colors.border,
    accent: colors.accent,
    accentMagenta: colors.accentMagenta,
  };
};
