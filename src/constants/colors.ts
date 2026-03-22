// src/theme/colors.ts

export const LightColors = {
  // ---- 60% Surfaces ----
  background: "#F8F8FC", // Premium Cool White Tint
  surface: "#FFFFFF",
  surfaceSecondary: "#F0F0F5",
  cardBackground: "#FFFFFF",
  inputBackground: "#F0F0F5",
  modalBackground: "#FFFFFF",
  postBackground: "#FFFFFF",

  // BNA-ui-provider compatibility
  card: "#FFFFFF",
  foreground: "#111216",

  // ---- 30% Neutral Text System ----
  textPrimary: "#111216",
  textSecondary: "#4A4C55",
  textTertiary: "#7B7D87",

  // BNA-ui-provider text compatibility
  text: "#111216",
  textMuted: "#7B7D87",

  // ---- Borders ----
  border: "#E4E4E7", // Zinc 200 (Clean, light grey for dividers)
  borderColor: "#E4E4E7",
  activeBorder: "#6C47FF",

  // ---- 10% Brand Accents ----
  accent: "#5A35FF",
  accentMagenta: "#FF2DF4",
  accentOrange: "#FF6B35",

  // BNA-ui-provider button compatibility
  primary: "#5A35FF",
  primaryForeground: "#FFFFFF",
  secondary: "#F3F4F6",
  secondaryForeground: "#111216",
  destructiveForeground: "#FFFFFF",
  red: "#E02E2E",
  green: "#29C268",
  icon: "#4A4C55",

  // Gradients
  gradientMain: "linear-gradient(135deg, #6C47FF 0%, #FF2DF4 100%)",

  // Semantic
  error: "#E02E2E",
  success: "#29C268",
  warning: "#F59E0B",
  heart: "#FF2D55",

  // Overlays
  overlay: "rgba(255,255,255,0.7)",

  // Shadows
  shadowBrand: "rgba(108, 71, 255, 0.25)",
};

export const DarkColors = {
  // ---- 60% Surfaces ----
  background: "#09090B", // Zinc 950
  surface: "#18181B", // Zinc 900
  surfaceSecondary: "#27272A", // Zinc 800
  cardBackground: "#18181B",
  inputBackground: "#27272A",
  modalBackground: "#18181B",
  postBackground: "#18181B",

  // BNA-ui-provider compatibility
  card: "#18181B",
  foreground: "#FAFAFA",

  // ---- 30% Neutral System ----
  textPrimary: "#FAFAFA",
  textSecondary: "#A1A1AA",
  textTertiary: "#52525B",

  // BNA-ui-provider text compatibility
  text: "#FAFAFA",
  textMuted: "#52525B",

  // ---- Borders ----
  border: "#3F3F46", // Zinc 700 (Visible but refined for dark mode)
  borderColor: "#3F3F46",
  activeBorder: "#6C47FF",

  // ---- 10% Brand Accents ----
  // Keeping darker purple for accents - still matches brand
  accent: "#5A35FF",
  accentMagenta: "#FF2DF4",
  accentOrange: "#FF6B35",

  // BNA-ui-provider button compatibility
  primary: "#5A35FF",
  primaryForeground: "#FFFFFF",
  secondary: "#27272A",
  secondaryForeground: "#FFFFFF",
  destructiveForeground: "#FFFFFF",
  red: "#FF4545",
  green: "#3DD68C",
  icon: "#9DA0B0",

  // Gradients
  gradientMain: "linear-gradient(135deg, #6C47FF 0%, #FF2DF4 100%)",

  // Semantic
  error: "#FF4545",
  success: "#3DD68C",
  warning: "#FBBF24",
  heart: "#FF2D55",

  // Overlays
  overlay: "rgba(20,20,25,0.6)",

  // Shadows
  shadowBrand: "rgba(108, 71, 255, 0.45)",
};

export const Colors = {
  light: LightColors,
  dark: DarkColors,
};
