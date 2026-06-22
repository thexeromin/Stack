import { create } from "zustand";
import type { Habit } from "@/types/habit";

interface HabitState {
  habits: Record<string, Habit>; // id -> Habit
  habitOrder: string[]; // for display order
  logs: Record<string, Record<string, boolean>>; // habitId -> date -> completed

  addHabit: (habit: Omit<Habit, "id" | "createdAt">) => void;
  toggleLog: (habitId: string, date: string) => void;
  removeHabit: (id: string) => void;
}

export const useHabitStore = create<HabitState>()((set) => ({
  habits: {},
  habitOrder: [],
  logs: {},

  addHabit: (habit: Omit<Habit, "id" | "createdAt">) => {},
  toggleLog: (habitId: string, date: string) => {},
  removeHabit: (id: string) => {}
}));
