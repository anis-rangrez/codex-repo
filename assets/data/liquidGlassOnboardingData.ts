import { AnimationObject } from "lottie-react-native";

export interface LiquidGlassOnboardingData {
  id: number;
  animation: AnimationObject;
  title: string;
  description: string;
  textColor: string;
  // Gradient colors for animated background
  gradientColors: string[];
  accentColor: string;
}

const liquidGlassOnboardingData: LiquidGlassOnboardingData[] = [
  {
    id: 1,
    title: "Welcome to VibLink",
    description:
      "The next generation social platform where authenticity meets innovation. Connect, create, and thrive.",
    animation: require("../lottie animations/Welcome.json"),
    textColor: "#FFFFFF",
    // VIBRANT Purple gradient - matching brand colors
    gradientColors: ["#2D1B69", "#1E1145", "#3D2080"],
    accentColor: "#6C47FF", // Brand accent
  },
  {
    id: 2,
    title: "100% Verified Users",
    description:
      "Our AI-powered video verification ensures every person is real. No bots, no catfish, just genuine connections.",
    animation: require("../lottie animations/Face scanning.json"),
    textColor: "#FFFFFF",
    // VIBRANT Cyan/Teal gradient - brighter
    gradientColors: ["#0F2847", "#0A1F3A", "#153658"],
    accentColor: "#00D4FF", // Bright cyan
  },
  {
    id: 3,
    title: "Earn While You Engage",
    description:
      "Transform your social interactions into rewards. Quality content and genuine engagement unlock real value.",
    animation: require("../lottie animations/engage.json"),
    textColor: "#FFFFFF",
    // VIBRANT Green/Emerald gradient - brighter
    gradientColors: ["#0D4030", "#082A20", "#125540"],
    accentColor: "#00FF88", // Bright emerald
  },
  {
    id: 4,
    title: "AI-Powered Safety",
    description:
      "Advanced moderation protects your experience. Enjoy a platform that's safe, trustworthy, and designed for you.",
    animation: require("../lottie animations/AI animation.json"),
    textColor: "#FFFFFF",
    // VIBRANT Magenta/Pink gradient - matching brand
    gradientColors: ["#4A1942", "#2E102A", "#5C2050"],
    accentColor: "#FF2DF4", // Brand magenta
  },
];

export default liquidGlassOnboardingData;