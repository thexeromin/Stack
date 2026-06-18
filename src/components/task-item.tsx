import { View, Text, StyleSheet } from "react-native";
import {
  MaterialDesignIcons,
  MaterialDesignIconsIconName
} from "@react-native-vector-icons/material-design-icons";
import { useTheme } from "@/hooks/use-theme";

export type TaskProps = {
  title: string;
  streak: number;
  icon: MaterialDesignIconsIconName;
  completed: boolean;
};

export function TaskItem({ title, streak, icon, completed }: TaskProps) {
  const theme = useTheme() as any;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.surfaceContainerLowest }
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.surfaceContainerLow }
        ]}
      >
        <MaterialDesignIcons name={icon} size={24} color={theme.primary} />
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
    </View>
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
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16
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
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2
  }
});
