import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { HeaderDate } from "@/components/header-date";
import { DailyProgress } from "@/components/daily-progress";
import { TaskList } from "@/components/task-list";

export default function Index() {
  const theme = useTheme() as any;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.surface }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeaderDate />
        <DailyProgress />
        <TaskList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 100
  }
});
