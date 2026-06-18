import { View, StyleSheet } from "react-native";
import { TaskItem, TaskProps } from "./task-item";

const TASKS: TaskProps[] = [
  { title: "Drink Water", streak: 12, icon: "water-outline", completed: true },
  {
    title: "Read 20 mins",
    streak: 5,
    icon: "book-open-variant",
    completed: false
  },
  { title: "Meditation", streak: 2, icon: "yoga", completed: false },
  { title: "Morning Jog", streak: 0, icon: "run", completed: false }
];

export function TaskList() {
  return (
    <View style={styles.container}>
      {TASKS.map((task, index) => (
        <TaskItem key={index} {...task} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20
  }
});
