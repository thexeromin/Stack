import { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { SettingsSection } from "@/components/settings-section";
import { SettingsItem } from "@/components/settings-item";

export default function Settings() {
  const theme = useTheme();

  const [globalReminders, setGlobalReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
            iconColor={theme.primary}
            iconBgColor={theme.primaryFixed}
            title="Global Reminders"
            isSwitch
            switchValue={globalReminders}
            onSwitchChange={setGlobalReminders}
          />
          <SettingsItem
            icon="weather-night"
            iconColor={theme.secondary}
            iconBgColor={theme.secondaryFixed}
            title="Quiet Hours"
            value="10:00 PM - 7:00 AM"
            showChevron
            isLast
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="Account">
          <SettingsItem
            icon="account-outline"
            iconColor={theme.tertiary}
            iconBgColor={theme.tertiaryFixed}
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
            switchValue={darkMode}
            onSwitchChange={setDarkMode}
          />
          <SettingsItem
            icon="star-circle-outline"
            iconColor={theme.tertiary}
            iconBgColor={theme.tertiaryFixed}
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
