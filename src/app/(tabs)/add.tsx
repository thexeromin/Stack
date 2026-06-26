import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
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
import { useRouter } from "expo-router";
import { useHabitStore } from "@/store/habit";
import { WEEKDAYS, type HabitIcon, type HabitColor } from "@/constants/habit";
import DateTimePicker from "@react-native-community/datetimepicker";
import { syncNotifications } from "@/services/notifications";

export default function Add() {
  const theme = useTheme();
  const router = useRouter();
  const addHabit = useHabitStore((state) => state.addHabit);

  const [habitName, setHabitName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("water-outline");
  const [selectedColor, setSelectedColor] = useState("#2170e4");
  const [freqType, setFreqType] = useState<"everyday" | "specific">("everyday");
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4]); // M-F
  const [dailyReminder, setDailyReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState<Date>(() => {
    const d = new Date();
    d.setHours(8, 0, 0, 0);
    return d;
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleDay = (index: number) => {
    setSelectedDays((prev) =>
      prev.includes(index)
        ? prev.filter((d) => d !== index)
        : [...prev, index].sort()
    );
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setReminderTime(selectedDate);
    }
  };

  const formatTime = (d: Date) => {
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;
    return `${h}:${m} ${ampm}`;
  };

  const handleSave = () => {
    if (!habitName.trim()) {
      Alert.alert("Error", "Please enter a habit name.");
      return;
    }

    addHabit({
      name: habitName.trim(),
      icon: selectedIcon as HabitIcon,
      color: selectedColor as HabitColor,
      archived: false,
      frequency: {
        type: freqType === "everyday" ? "daily" : "custom",
        days:
          freqType === "specific"
            ? selectedDays.map((i) => WEEKDAYS[i])
            : undefined
      },
      reminder: {
        enabled: dailyReminder,
        time: dailyReminder
          ? `${String(reminderTime.getHours()).padStart(2, "0")}:${String(reminderTime.getMinutes()).padStart(2, "0")}`
          : undefined
      }
    });

    // Reset form
    setHabitName("");
    setSelectedIcon("water-outline");
    setSelectedColor("#2170e4");
    setFreqType("everyday");
    setSelectedDays([0, 1, 2, 3, 4]);
    setDailyReminder(true);

    // Synchronize notifications
    syncNotifications();

    // Navigate to home tab
    router.navigate("/");
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

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowTimePicker(true)}
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
                Notify me at {formatTime(reminderTime)}
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
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={reminderTime}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <View style={styles.buttonContainer}>
          <PrimaryButton title="Save Habit" onPress={handleSave} />
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
