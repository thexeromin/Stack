import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { Spacing } from "@/constants/theme";
import { StatCard } from "@/components/stat-card";
import { HabitItem } from "@/components/habit-item";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Insights() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

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

      <HabitItem
        title="Morning Yoga"
        streak="5 days streak"
        iconName="yoga"
        iconColor={theme.primary}
        iconBgColor={theme.primaryFixed}
        history={[true, true, true, false, true, true, true]}
      />
      <HabitItem
        title="Read 20 mins"
        streak="12 days streak"
        iconName="book-open-page-variant"
        iconColor={theme.tertiary}
        iconBgColor={theme.tertiaryFixed}
        history={[true, true, true, true, true, true, true]}
      />
      <HabitItem
        title="Drink Water"
        streak="2 days streak"
        iconName="water"
        iconColor={theme.secondary}
        iconBgColor={theme.secondaryFixed}
        history={[false, false, false, true, true, true, true]}
      />
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
