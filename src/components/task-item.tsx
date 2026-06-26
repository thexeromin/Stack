import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  MaterialDesignIcons,
  MaterialDesignIconsIconName
} from "@react-native-vector-icons/material-design-icons";
import { useTheme } from "@/hooks/use-theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export type TaskProps = {
  title: string;
  streak: number;
  icon: MaterialDesignIconsIconName;
  color: string;
  completed: boolean;
  onToggle?: () => void;
  onLongPress?: () => void;
};

export function TaskItem({
  title,
  streak,
  icon,
  color,
  completed,
  onToggle,
  onLongPress
}: TaskProps) {
  const theme = useTheme() as any;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconBackgroundColor = isDark ? `${color}40` : `${color}26`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      onLongPress={onLongPress}
      style={[
        styles.container,
        { backgroundColor: theme.surfaceContainerLowest }
      ]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}
      >
        <MaterialDesignIcons name={icon} size={24} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.onSurface }]}>{title}</Text>
        <Text style={[styles.streak, { color: theme.outline }]}>
          {streak} day streak
        </Text>
      </View>
      <View style={styles.statusContainer}>
        {completed ? (
          <View
            style={[
              styles.completedCircle,
              { backgroundColor: theme.secondary }
            ]}
          >
            <MaterialDesignIcons
              name="check"
              size={20}
              color={theme.onSecondary}
            />
          </View>
        ) : (
          <View
            style={[styles.emptyCircle, { borderColor: theme.outlineVariant }]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 24,
    marginBottom: 12
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    overflow: "hidden"
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    marginBottom: 4
  },
  streak: {
    fontFamily: "Inter_500Medium",
    fontSize: 13
  },
  statusContainer: {
    marginLeft: 16
  },
  completedCircle: {
    width: 32,
    height: 32,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyCircle: {
    width: 32,
    height: 32,
    borderRadius: 99,
    borderWidth: 2
  }
});
