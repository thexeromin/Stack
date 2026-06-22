import type { HabitIcon, HabitColor } from "@/constants/habit";
import { WEEKDAYS } from "@/constants/habit";

export type Weekday = (typeof WEEKDAYS)[number];

export interface Habit {
  id: string;
  name: string;
  icon: HabitIcon;
  color: HabitColor;
  createdAt: string;
  archived: boolean;
  frequency: {
    type: "daily" | "custom";
    days?: Weekday[];
  };
  reminder: {
    enabled: boolean;
    time?: string; // "HH:mm", only if enabled
  };
}

export interface HabitLog {
  habitId: string;
  date: string; // "YYYY-MM-DD"
  completed: boolean;
}
