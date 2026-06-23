import { create } from "zustand";
import type { Habit } from "@/types/habit";
import { nanoid } from "nanoid/non-secure";

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

  addHabit: (habit) =>
    set((state) => {
      const id = nanoid();
      const createdAt = new Date().toISOString();
      return {
        habits: { ...state.habits, [id]: { ...habit, id, createdAt } as Habit },
        habitOrder: [...state.habitOrder, id]
      };
    }),
  toggleLog: (habitId, date) =>
    set((state) => {
      const habitLogs = state.logs[habitId] || {};
      const isCompleted = habitLogs[date] || false;
      return {
        logs: {
          ...state.logs,
          [habitId]: {
            ...habitLogs,
            [date]: !isCompleted
          }
        }
      };
    }),
  removeHabit: (id: string) => {}
}));
