import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { CircularProgress } from "./circular-progress";

import { useHabitStore } from "@/store/habit";
import type { Weekday } from "@/types/habit";

export function DailyProgress() {
  const theme = useTheme() as any;
  const habits = useHabitStore((state) => state.habits);
  const habitOrder = useHabitStore((state) => state.habitOrder);
  const logs = useHabitStore((state) => state.logs);

  // Date and day logic
  const todayDate = new Date();
  const todayDateStr = todayDate.toLocaleDateString("en-CA");
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const todayDayName = dayNames[todayDate.getDay()] as Weekday;

  // Calculate stats
  const habitsToday = habitOrder.filter((id) => {
    const habit = habits[id];
    if (!habit) return false;
    if (habit.frequency.type === "daily") return true;
    return habit.frequency.days?.includes(todayDayName);
  });

  const totalHabits = habitsToday.length;
  const completedHabits = habitsToday.filter(
    (id) => logs[id]?.[todayDateStr]
  ).length;

  // Edge case: 0 habits today
  const progress =
    totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.surfaceContainerLowest }
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.subtitle, { color: theme.outline }]}>
          Daily Progress
        </Text>
        <Text style={[styles.title, { color: theme.onSurface }]}>
          {totalHabits === 0
            ? "No habits for today"
            : `${completedHabits} of ${totalHabits} completed`}
        </Text>
      </View>
      <CircularProgress progress={progress} size={72} strokeWidth={8} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 24
  },
  textContainer: {
    flex: 1
  },
  subtitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    marginBottom: 4
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 20
  }
});
