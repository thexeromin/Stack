import { View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { Spacing } from "@/constants/theme";
import { StatCard } from "@/components/stat-card";
import { useHabitStore } from "@/store/habit";

export function InsightsSummary() {
  const theme = useTheme() as any;
  const habits = useHabitStore((state) => state.habits);
  const habitOrder = useHabitStore((state) => state.habitOrder);
  const logs = useHabitStore((state) => state.logs);

  const last7DaysDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  // Calculate dynamic stats
  let totalExpected = 0;
  let totalCompleted = 0;
  let bestStreak = 0;

  const today = new Date().toLocaleDateString("en-CA");

  habitOrder.forEach((id) => {
    const habit = habits[id];
    if (!habit) return;
    const habitLogs = logs[id] || {};

    // Best Streak calculation
    let currentStreak = 0;
    let currentDate = new Date();
    while (true) {
      const dStr = currentDate.toLocaleDateString("en-CA");
      if (habitLogs[dStr]) {
        currentStreak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        if (dStr === today) {
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }
    if (currentStreak > bestStreak) bestStreak = currentStreak;

    // Weekly Consistency calculation
    last7DaysDates.forEach((d) => {
      const dStr = d.toLocaleDateString("en-CA");
      const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const dayName = dayNames[d.getDay()];

      let isScheduled = false;
      if (habit.frequency.type === "daily") {
        isScheduled = true;
      } else if (habit.frequency.days?.includes(dayName as any)) {
        isScheduled = true;
      }

      if (isScheduled) {
        totalExpected++;
        if (habitLogs[dStr]) {
          totalCompleted++;
        }
      }
    });
  });

  const weeklyConsistency =
    totalExpected === 0
      ? 0
      : Math.round((totalCompleted / totalExpected) * 100);

  return (
    <View style={styles.statsRow}>
      <StatCard
        title="7-Day Consistency"
        iconName="chart-timeline-variant"
        iconColor={theme.primary}
        iconBgColor={theme.primaryFixed}
        value={`${weeklyConsistency}%`}
        subValue={
          totalExpected === 0
            ? "No habits scheduled"
            : `${totalCompleted}/${totalExpected} completed`
        }
        style={styles.statCardLeft}
      />
      <StatCard
        title="Best Streak"
        iconName="fire"
        iconColor={theme.tertiary}
        iconBgColor={theme.tertiaryFixed}
        value={`${bestStreak} days`}
        subValue="Longest active streak"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    marginBottom: Spacing.five
  },
  statCardLeft: {
    marginRight: Spacing.three
  }
});
