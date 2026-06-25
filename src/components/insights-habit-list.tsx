import { HabitItem } from "@/components/habit-item";
import { useHabitStore } from "@/store/habit";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function InsightsHabitList() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const habits = useHabitStore((state) => state.habits);
  const habitOrder = useHabitStore((state) => state.habitOrder);
  const logs = useHabitStore((state) => state.logs);

  const last7DaysDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const last7Days = last7DaysDates.map((d) => d.toLocaleDateString("en-CA"));

  return (
    <>
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
    </>
  );
}
