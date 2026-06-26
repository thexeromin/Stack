import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { SettingsSection } from "@/components/settings-section";
import { SettingsItem } from "@/components/settings-item";
import { useSettingsStore } from "@/store/settings";
import DateTimePicker from "@react-native-community/datetimepicker";
import { syncNotifications } from "@/services/notifications";

export default function Settings() {
  const theme = useTheme();

  const systemScheme = useColorScheme();
  const darkMode = useSettingsStore((state) => state.darkMode);
  const setDarkMode = useSettingsStore((state) => state.setDarkMode);
  const isDark = darkMode ?? systemScheme === "dark";

  const globalReminders = useSettingsStore((state) => state.globalReminders);
  const quietHours = useSettingsStore((state) => state.quietHours);
  const setGlobalReminders = useSettingsStore(
    (state) => state.setGlobalReminders
  );
  const setQuietHours = useSettingsStore((state) => state.setQuietHours);

  const [pickerMode, setPickerMode] = useState<"start" | "end" | null>(null);

  const handleGlobalReminders = (val: boolean) => {
    setGlobalReminders(val);
    syncNotifications();
  };

  const handleQuietHoursPress = () => {
    Alert.alert("Quiet Hours", "Which time would you like to edit?", [
      { text: "Start Time", onPress: () => setPickerMode("start") },
      { text: "End Time", onPress: () => setPickerMode("end") },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed" || !selectedDate) {
      setPickerMode(null);
      return;
    }

    const timeStr = `${String(selectedDate.getHours()).padStart(2, "0")}:${String(selectedDate.getMinutes()).padStart(2, "0")}`;
    if (pickerMode === "start") {
      setQuietHours(timeStr, quietHours.end);
    } else {
      setQuietHours(quietHours.start, timeStr);
    }
    setPickerMode(null);
    syncNotifications();
  };

  const formatQuietHours = (t: string) => {
    const [h, m] = t.split(":");
    let hh = parseInt(h, 10);
    const ampm = hh >= 12 ? "PM" : "AM";
    hh = hh % 12;
    hh = hh ? hh : 12;
    return `${hh}:${m} ${ampm}`;
  };

  const activeDate = new Date();
  if (pickerMode) {
    const timeStr = pickerMode === "start" ? quietHours.start : quietHours.end;
    const [h, m] = timeStr.split(":");
    activeDate.setHours(parseInt(h, 10));
    activeDate.setMinutes(parseInt(m, 10));
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.surface }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text
            style={[
              styles.headerTitle,
              { color: theme.onSurface, fontFamily: "Inter_700Bold" }
            ]}
          >
            Settings
          </Text>
        </View>

        <SettingsSection title="Notifications">
          <SettingsItem
            icon="bell-outline"
            iconColor={theme.onPrimaryContainer}
            iconBgColor={theme.primaryContainer}
            title="Global Reminders"
            isSwitch
            switchValue={globalReminders}
            onSwitchChange={handleGlobalReminders}
          />
          <SettingsItem
            icon="weather-night"
            iconColor={theme.onSecondaryContainer}
            iconBgColor={theme.secondaryContainer}
            title="Quiet Hours"
            value={`${formatQuietHours(quietHours.start)} - ${formatQuietHours(quietHours.end)}`}
            showChevron
            isLast
            onPress={handleQuietHoursPress}
          />
        </SettingsSection>

        <SettingsSection title="Account">
          <SettingsItem
            icon="account-outline"
            iconColor={theme.onTertiaryContainer}
            iconBgColor={theme.tertiaryContainer}
            title="Profile"
            showChevron
            onPress={() => {}}
          />
          <SettingsItem
            icon="download-outline"
            iconColor={theme.outline}
            iconBgColor={theme.surfaceVariant}
            title="Data Export"
            showChevron
            isLast
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="App">
          <SettingsItem
            icon="weather-night"
            iconColor={theme.onSurfaceVariant}
            iconBgColor={theme.surfaceVariant}
            title="Dark Mode"
            isSwitch
            switchValue={isDark}
            onSwitchChange={(val) => setDarkMode(val)}
          />
          <SettingsItem
            icon="star-circle-outline"
            iconColor={theme.onTertiaryContainer}
            iconBgColor={theme.tertiaryContainer}
            title="Premium Features"
            showChevron
            onPress={() => {}}
          />
          <SettingsItem
            icon="help-circle-outline"
            iconColor={theme.outline}
            iconBgColor={theme.surfaceVariant}
            title="Help & Support"
            showChevron
            isLast
            onPress={() => {}}
          />
        </SettingsSection>

        {pickerMode && (
          <DateTimePicker
            value={activeDate}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 40
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24
  },
  headerTitle: {
    fontSize: 32
  }
});
