import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsState {
  globalReminders: boolean;
  quietHours: {
    start: string; // "HH:mm"
    end: string; // "HH:mm"
  };
  setGlobalReminders: (value: boolean) => void;
  setQuietHours: (start: string, end: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      globalReminders: true,
      quietHours: {
        start: "22:00",
        end: "07:00"
      },
      setGlobalReminders: (value) => set({ globalReminders: value }),
      setQuietHours: (start, end) => set({ quietHours: { start, end } })
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
