import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  MaterialDesignIcons,
  MaterialDesignIconsIconName
} from "@react-native-vector-icons/material-design-icons";
import { useTheme } from "@/hooks/use-theme";
import { Spacing } from "@/constants/theme";

interface HabitItemProps {
  title: string;
  streak: string;
  iconName: MaterialDesignIconsIconName;
  iconColor: string;
  iconBgColor: string;
  history: boolean[]; // Array of 7 booleans for the last 7 days
}

export function HabitItem({
  title,
  streak,
  iconName,
  iconColor,
  iconBgColor,
  history
}: HabitItemProps) {
  const theme = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.surfaceContainerLowest,
          borderColor: theme.surfaceContainerHighest,
          opacity: pressed ? 0.9 : 1
        }
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <MaterialDesignIcons name={iconName} size={24} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.onSurface }]}>{title}</Text>
        <Text style={[styles.streak, { color: theme.onSurfaceVariant }]}>
          {streak}
        </Text>
      </View>
      <View style={styles.historyContainer}>
        {history.slice(0, 7).map((completed, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: completed
                  ? theme.secondary
                  : theme.surfaceContainerHigh
              }
            ]}
          />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.three,
    borderRadius: 24,
    marginBottom: Spacing.three
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.three
  },
  textContainer: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginBottom: 2
  },
  streak: {
    fontSize: 13,
    fontFamily: "Inter_500Medium"
  },
  historyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Spacing.two
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2
  }
});
