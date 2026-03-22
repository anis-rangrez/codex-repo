// typography.ts
export const typography = {
  fontFamily: {
    regular: "PlusJakartaSans-Regular",
    medium: "PlusJakartaSans-Medium",
    semibold: "PlusJakartaSans-SemiBold",
    bold: "PlusJakartaSans-Bold",
    extrabold: "PlusJakartaSans-ExtraBold",
  },
  fontSize: {
    xxs: 10,
    xs: 12,
    sm: 14,
    base: 16, // ADD THIS - marks default body text
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
    hero: 48, // ADD THIS - for hero text
  },
  lineHeight: {
    tight: 1.1, // For headlines
    snug: 1.25, // ADD THIS - comfortable for UI
    normal: 1.4, // CHANGE from 1.3 (1.4 is better for readability)
    relaxed: 1.6, // CHANGE from 1.5 (1.6 is better for long text)
    loose: 2, // ADD THIS - for extra spacing
  },
  letterSpacing: {
    // ADD THIS - important for premium feel
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
  },
};
