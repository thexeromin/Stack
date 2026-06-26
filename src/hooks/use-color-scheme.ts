import { useColorScheme as useNativeColorScheme } from "react-native";
import { useSettingsStore } from "@/store/settings";

export function useColorScheme() {
  const systemScheme = useNativeColorScheme();
  const darkMode = useSettingsStore((state) => state.darkMode);

  if (darkMode === true) return "dark";
  if (darkMode === false) return "light";
  return systemScheme ?? "light";
}
