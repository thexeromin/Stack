import { View, StyleSheet } from "react-native";
import { TaskItem } from "./task-item";

import { useHabitStore } from "@/store/habit";

export function TaskList() {
  const habits = useHabitStore((state) => state.habits);
  const habitOrder = useHabitStore((state) => state.habitOrder);
  const logs = useHabitStore((state) => state.logs);

  // Get today's date in YYYY-MM-DD format based on local time
  const today = new Date().toLocaleDateString("en-CA");

  return (
    <View style={styles.container}>
      {habitOrder.map((id) => {
        const habit = habits[id];
        if (!habit) return null;

        const completed = logs[id]?.[today] || false;
        // TODO: implment streak functionality
        const streak = 0;

        return (
          <TaskItem
            key={id}
            title={habit.name}
            streak={streak}
            icon={habit.icon as any}
            completed={completed}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20
  }
});
