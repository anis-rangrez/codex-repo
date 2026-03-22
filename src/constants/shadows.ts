// shadows.ts - Fixed for React Native + Web
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const shadows = {
  // ==========================================
  // NEUTRAL SHADOWS (for cards, buttons, etc)
  // ==========================================
  none: {
    ...Platform.select({
      web: { boxShadow: "none" },
      default: {
        shadowColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
    }),
  },

  sm: {
    // Small shadow - for buttons, small cards
    ...Platform.select({
      web: { boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
    }),
  },

  md: {
    // Medium shadow - for cards, inputs (focused)
    ...Platform.select({
      web: { boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
  },

  lg: {
    // Large shadow - for elevated cards
    ...Platform.select({
      web: { boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },

  xl: {
    // Extra large - for modals, bottom sheets
    ...Platform.select({
      web: { boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.16)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
        elevation: 8,
      },
    }),
  },

  // ==========================================
  // DARK MODE SHADOWS (stronger for visibility)
  // ==========================================
  smDark: {
    ...Platform.select({
      web: { boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.4)" },
      default: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 3,
      },
    }),
  },

  mdDark: {
    ...Platform.select({
      web: { boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.6)" },
      default: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 16,
        elevation: 6,
      },
    }),
  },

  lgDark: {
    ...Platform.select({
      web: { boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.8)" },
      default: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.8,
        shadowRadius: 24,
        elevation: 12,
      },
    }),
  },

  xlDark: {
    ...Platform.select({
      web: { boxShadow: "0px 16px 32px rgba(0, 0, 0, 0.9)" },
      default: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.9,
        shadowRadius: 32,
        elevation: 16,
      },
    }),
  },

  // ==========================================
  // BRAND SHADOWS (purple glow for accents)
  // ==========================================
  brandGlow: {
    ...Platform.select({
      web: { boxShadow: "0px 4px 12px rgba(90, 53, 255, 0.3)" },
      default: {
        shadowColor: "#5A35FF", // Updated accent color
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
      },
    }),
  },

  brandGlowStrong: {
    ...Platform.select({
      web: { boxShadow: "0px 8px 20px rgba(90, 53, 255, 0.5)" },
      default: {
        shadowColor: "#5A35FF",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
      },
    }),
  },

  // ==========================================
  // SEMANTIC SHADOWS (for buttons, states)
  // ==========================================
  successGlow: {
    ...Platform.select({
      web: { boxShadow: "0px 4px 12px rgba(16, 185, 129, 0.3)" },
      default: {
        shadowColor: "#10B981", // Green
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
      },
    }),
  },

  errorGlow: {
    ...Platform.select({
      web: { boxShadow: "0px 4px 12px rgba(239, 68, 68, 0.3)" },
      default: {
        shadowColor: "#EF4444", // Red
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
      },
    }),
  },
};

// ==========================================
// HELPER FUNCTION (get shadow based on theme)
// ==========================================
export const getShadow = (size: "sm" | "md" | "lg" | "xl", isDark: boolean) => {
  if (isDark) {
    return shadows[`${size}Dark` as keyof typeof shadows];
  }
  return shadows[size];
};
