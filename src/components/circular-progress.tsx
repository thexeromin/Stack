import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useTheme } from "@/hooks/use-theme";

export function CircularProgress({
  progress,
  size = 64,
  strokeWidth = 6
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) {
  const theme = useTheme() as any;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle
          stroke={theme.surfaceContainerHigh}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={theme.primary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={[styles.text, { color: theme.primary }]}>{progress}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter_700Bold",
    fontSize: 14
  }
});
