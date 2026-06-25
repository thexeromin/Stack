import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { Spacing } from "@/constants/theme";
import { StatCard } from "@/components/stat-card";
import { HabitItem } from "@/components/habit-item";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHabitStore } from "@/store/habit";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function Insights() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const habits = useHabitStore((state) => state.habits);
  const habitOrder = useHabitStore((state) => state.habitOrder);
  const logs = useHabitStore((state) => state.logs);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString("en-CA");
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.surface }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + Spacing.four,
          paddingBottom: insets.bottom + Spacing.six
        }
      ]}
    >
      <View style={styles.statsRow}>
        <StatCard
          title="Completion"
          iconName="chart-pie"
          iconColor={theme.primary}
          iconBgColor={theme.primaryFixed}
          value="78%"
          subValue="5% from last week"
          subValueIcon="arrow-up"
          subValueColor={theme.secondary}
          style={styles.statCardLeft}
        />
        <StatCard
          title="Active Streak"
          iconName="fire"
          iconColor={theme.tertiary}
          iconBgColor={theme.tertiaryFixed}
          value="12 days"
          subValue="Keep it up!"
        />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.onSurface }]}>
        Your Habits
      </Text>

      {habitOrder.map((id) => {
        const habit = habits[id];
        if (!habit) return null;

        const habitLogs = logs[id] || {};
        const history = last7Days.map((date) => !!habitLogs[date]);

        let streakCount = 0;
        const today = new Date().toLocaleDateString("en-CA");
        let currentDate = new Date();

        while (true) {
          const dStr = currentDate.toLocaleDateString("en-CA");
          if (habitLogs[dStr]) {
            streakCount++;
            currentDate.setDate(currentDate.getDate() - 1);
          } else {
            // Allow the streak to continue if only today is missed so far
            if (dStr === today) {
              currentDate.setDate(currentDate.getDate() - 1);
            } else {
              break;
            }
          }
        }

        const iconBgColor = isDark ? `${habit.color}40` : `${habit.color}26`;

        return (
          <HabitItem
            key={id}
            title={habit.name}
            streak={`${streakCount} day${streakCount !== 1 ? "s" : ""} streak`}
            iconName={habit.icon as any}
            iconColor={habit.color}
            iconBgColor={iconBgColor}
            history={history}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: Spacing.four
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: Spacing.five
  },
  statCardLeft: {
    marginRight: Spacing.three
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: Spacing.four
  }
});
