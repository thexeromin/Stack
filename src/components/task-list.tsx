import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TaskItem } from "./task-item";
import { ConfirmModal } from "./confirm-modal";

import { useHabitStore } from "@/store/habit";

export function TaskList() {
  const habits = useHabitStore((state) => state.habits);
  const habitOrder = useHabitStore((state) => state.habitOrder);
  const logs = useHabitStore((state) => state.logs);
  const toggleLog = useHabitStore((state) => state.toggleLog);
  const removeHabit = useHabitStore((state) => state.removeHabit);

  const [habitToDelete, setHabitToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDelete = () => {
    if (habitToDelete) {
      removeHabit(habitToDelete.id);
      setHabitToDelete(null);
    }
  };

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
            color={habit.color}
            completed={completed}
            onToggle={() => toggleLog(id, today)}
            onLongPress={() => setHabitToDelete({ id, name: habit.name })}
          />
        );
      })}

      <ConfirmModal
        visible={!!habitToDelete}
        title="Delete Habit"
        message={`Are you sure you want to delete "${habitToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setHabitToDelete(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20
  }
});
