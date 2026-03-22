import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { tw, shadows } from "../constants"; // our design system

export default function Home() {
  // Access NativeWind's color scheme
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      className={
        isDark ? "flex-1 bg-dark-background" : "flex-1 bg-light-background"
      }
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <ScrollView
        className="flex-1 px-6 pt-10"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View className="flex-row items-center justify-between mt-6 mb-8">
          <View>
            <Text
              className={
                isDark
                  ? "text-dark-text-secondary font-sans-medium text-sm"
                  : "text-light-text-secondary font-sans-medium text-sm"
              }
            >
              Good Morning,
            </Text>
            <Text
              className={
                isDark ? tw.patterns.headingDark : tw.patterns.headingLight
              }
            >
              Alex Designer
            </Text>
          </View>

          {/* THEME TOGGLE */}
          <TouchableOpacity
            onPress={toggleColorScheme}
            className={
              isDark
                ? tw.patterns.buttonSecondaryDark + " p-3"
                : tw.patterns.buttonSecondaryLight + " p-3"
            }
            activeOpacity={0.7}
          >
            <Ionicons
              name={isDark ? "sunny" : "moon"}
              size={24}
              color={isDark ? "#FFFFFF" : "#111216"}
            />
          </TouchableOpacity>
        </View>

        {/* HERO CARD (Brand Context & Gradient) */}
        <View
          className="rounded-3xl p-6 mb-8 bg-gradient-brand overflow-hidden"
          style={shadows.brandGlow}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white/80 font-sans-medium text-sm tracking-wider uppercase">
              Pro Member
            </Text>
            <Ionicons name="star" size={16} color="white" />
          </View>
          <Text className="text-white font-sans-extrabold text-3xl mb-1">
            Design System
          </Text>
          <Text className="text-white/90 font-sans text-base mb-6">
            Showcasing typography, spacing, and 30-60-10 color rules.
          </Text>

          <TouchableOpacity className="bg-white/20 self-start rounded-full px-5 py-2">
            <Text className="text-white font-sans-semibold">
              View Guidelines
            </Text>
          </TouchableOpacity>
        </View>

        {/* STATS GRID */}
        <Text
          className={
            isDark
              ? tw.patterns.headingDark + " text-xl mb-4"
              : tw.patterns.headingLight + " text-xl mb-4"
          }
        >
          Overview
        </Text>
        <View className="flex-row justify-between mb-8">
          {/* Card 1 */}
          <View
            className={
              (isDark ? tw.patterns.cardDark : tw.patterns.cardLight) +
              " flex-1 mr-2"
            }
            style={isDark ? shadows.mdDark : shadows.md}
          >
            <View className="bg-accent/10 self-start p-2 rounded-lg mb-3">
              <Ionicons
                name="color-palette"
                size={20}
                color={tw.accents.primaryText.split("-")[1] || "#5A35FF"}
              />
            </View>
            <Text
              className={isDark ? tw.patterns.bodyDark : tw.patterns.bodyLight}
            >
              Colors
            </Text>
            <Text
              className={
                isDark
                  ? "text-dark-text font-sans-bold text-2xl"
                  : "text-light-text font-sans-bold text-2xl"
              }
            >
              24+
            </Text>
          </View>

          {/* Card 2 */}
          <View
            className={
              (isDark ? tw.patterns.cardDark : tw.patterns.cardLight) +
              " flex-1 ml-2"
            }
            style={isDark ? shadows.mdDark : shadows.md}
          >
            <View className="bg-accent-magenta/10 self-start p-2 rounded-lg mb-3">
              <Ionicons name="text" size={20} color="#FF2DF4" />
            </View>
            <Text
              className={isDark ? tw.patterns.bodyDark : tw.patterns.bodyLight}
            >
              Typography
            </Text>
            <Text
              className={
                isDark
                  ? "text-dark-text font-sans-bold text-2xl"
                  : "text-light-text font-sans-bold text-2xl"
              }
            >
              5 Weights
            </Text>
          </View>
        </View>

        {/* RECENT ACTIVITY LIST (Hierarchy & Borders) */}
        <Text
          className={
            isDark
              ? tw.patterns.headingDark + " text-xl mb-4"
              : tw.patterns.headingLight + " text-xl mb-4"
          }
        >
          Activity
        </Text>
        <View
          className={
            (isDark ? tw.patterns.cardDark : tw.patterns.cardLight) + " mb-10"
          }
          style={isDark ? shadows.smDark : shadows.sm}
        >
          <View
            className={
              "flex-row items-center py-3 border-b " +
              (isDark ? "border-dark-border" : "border-light-border")
            }
          >
            <View className="w-10 h-10 rounded-full bg-accent items-center justify-center mr-4">
              <Text className="text-white font-sans-bold">UX</Text>
            </View>
            <View className="flex-1">
              <Text
                className={
                  isDark
                    ? "text-dark-text font-sans-semibold"
                    : "text-light-text font-sans-semibold"
                }
              >
                Guidelines Generated
              </Text>
              <Text
                className={
                  isDark
                    ? "text-dark-text-tertiary font-sans text-xs"
                    : "text-light-text-tertiary font-sans text-xs"
                }
              >
                Just now
              </Text>
            </View>
          </View>

          <View className="flex-row items-center py-3">
            <View className="w-10 h-10 rounded-full bg-green-500 items-center justify-center mr-4">
              <Ionicons name="checkmark" size={18} color="white" />
            </View>
            <View className="flex-1">
              <Text
                className={
                  isDark
                    ? "text-dark-text font-sans-semibold"
                    : "text-light-text font-sans-semibold"
                }
              >
                Colors Upgraded
              </Text>
              <Text
                className={
                  isDark
                    ? "text-dark-text-tertiary font-sans text-xs"
                    : "text-light-text-tertiary font-sans text-xs"
                }
              >
                2 minutes ago
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
