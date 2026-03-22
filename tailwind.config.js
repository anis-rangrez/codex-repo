/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-background": "#F8F8FC",
        "light-surface": "#FFFFFF",
        "light-surface-secondary": "#F0F0F5",
        "light-card": "#FFFFFF",
        "light-input": "#F0F0F5",
        "light-modal": "#FFFFFF",
        "light-post": "#FFFFFF",
        "light-text": "#111216",
        "light-text-secondary": "#4A4C55",
        "light-text-tertiary": "#7B7D87",
        "light-text-muted": "#7B7D87",
        "light-border": "#E4E4E7",
        "light-border-active": "#6C47FF",

        "dark-background": "#09090B",
        "dark-surface": "#18181B",
        "dark-surface-secondary": "#27272A",
        "dark-card": "#18181B",
        "dark-input": "#27272A",
        "dark-modal": "#18181B",
        "dark-post": "#18181B",
        "dark-text": "#FAFAFA",
        "dark-text-secondary": "#A1A1AA",
        "dark-text-tertiary": "#52525B",
        "dark-text-muted": "#52525B",
        "dark-border": "#3F3F46",
        "dark-border-active": "#6C47FF",

        accent: "#5A35FF",
        "accent-magenta": "#FF2DF4",
        "accent-orange": "#FF6B35",
      },
      fontFamily: {
        sans: ["PlusJakartaSans-Regular"],
        "sans-medium": ["PlusJakartaSans-Medium"],
        "sans-semibold": ["PlusJakartaSans-SemiBold"],
        "sans-bold": ["PlusJakartaSans-Bold"],
        "sans-extrabold": ["PlusJakartaSans-ExtraBold"],
      },
      fontSize: {
        xxs: ["10px", "1.1"],
        display: ["40px", "1.1"],
        hero: ["48px", "1.1"],
      },
    },
  },
  plugins: [],
};
