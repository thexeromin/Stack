import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { FormSection } from "@/components/form-section";
import { IconSelector } from "@/components/icon-selector";
import { ColorSelector } from "@/components/color-selector";
import { FrequencySelector } from "@/components/frequency-selector";
import { PrimaryButton } from "@/components/primary-button";
import { CustomSwitch } from "@/components/custom-switch";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { BottomTabInset } from "@/constants/theme";

export default function Add() {
  const theme = useTheme();

  const [habitName, setHabitName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("water-outline");
  const [selectedColor, setSelectedColor] = useState("#2170e4");
  const [freqType, setFreqType] = useState<"everyday" | "specific">("everyday");
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4]); // M-F
  const [dailyReminder, setDailyReminder] = useState(true);

  const toggleDay = (index: number) => {
    setSelectedDays((prev) =>
      prev.includes(index)
        ? prev.filter((d) => d !== index)
        : [...prev, index].sort()
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.surface }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 40 + BottomTabInset }
        ]}
      >
        <View style={styles.inputContainer}>
          <Text
            style={[
              styles.inputLabel,
              { color: theme.onSurfaceVariant, fontFamily: "Inter_500Medium" }
            ]}
          >
            Habit Name
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.surfaceContainerLowest,
                borderColor: theme.outlineVariant,
                color: theme.onSurface,
                fontFamily: "Inter_400Regular"
              }
            ]}
            placeholder="e.g. Drink Water, Read 20 pages..."
            placeholderTextColor={theme.outline}
            value={habitName}
            onChangeText={setHabitName}
          />
        </View>

        <FormSection title="Choose Icon">
          <IconSelector
            selectedIcon={selectedIcon}
            onSelect={setSelectedIcon}
          />
        </FormSection>

        <FormSection title="Theme Color">
          <ColorSelector
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />
        </FormSection>

        <FormSection title="Frequency">
          <FrequencySelector
            type={freqType}
            setType={setFreqType}
            selectedDays={selectedDays}
            toggleDay={toggleDay}
          />
        </FormSection>

        <View
          style={[
            styles.reminderCard,
            { backgroundColor: theme.surfaceContainerLowest }
          ]}
        >
          <View style={styles.reminderLeft}>
            <View
              style={[
                styles.reminderIconBg,
                { backgroundColor: theme.surfaceContainerLow }
              ]}
            >
              <MaterialDesignIcons
                name="bell-outline"
                size={20}
                color={theme.onSurfaceVariant}
              />
            </View>
            <View>
              <Text
                style={[
                  styles.reminderTitle,
                  { color: theme.onSurface, fontFamily: "Inter_500Medium" }
                ]}
              >
                Daily Reminder
              </Text>
              <Text
                style={[
                  styles.reminderSubtitle,
                  {
                    color: theme.onSurfaceVariant,
                    fontFamily: "Inter_400Regular"
                  }
                ]}
              >
                Notify me at 08:00 AM
              </Text>
            </View>
          </View>
          <CustomSwitch
            value={dailyReminder}
            onValueChange={setDailyReminder}
            activeColor={theme.primary}
            inactiveColor={theme.surfaceContainerHighest}
            thumbColor={theme.surfaceContainerLowest}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton title="Save Habit" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  scrollContent: {
    padding: 16
  },
  inputContainer: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16
  },
  reminderCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24
  },
  reminderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  reminderIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  reminderTitle: {
    fontSize: 15,
    marginBottom: 2
  },
  reminderSubtitle: {
    fontSize: 12
  },
  buttonContainer: {
    marginTop: 8
  }
});
