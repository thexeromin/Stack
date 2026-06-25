import { Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { Spacing } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InsightsSummary } from "@/components/insights-summary";
import { InsightsHabitList } from "@/components/insights-habit-list";

export default function Insights() {
  const theme = useTheme() as any;
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
      <InsightsSummary />

      <Text style={[styles.sectionTitle, { color: theme.onSurface }]}>
        Your Habits
      </Text>

      <InsightsHabitList />
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
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: Spacing.four
  }
});
