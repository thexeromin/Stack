import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { WEEKDAYS } from "@/constants/habit";

interface FrequencySelectorProps {
  type: "everyday" | "specific";
  setType: (type: "everyday" | "specific") => void;
  selectedDays: number[]; // 0-6
  toggleDay: (index: number) => void;
}

export const FrequencySelector = ({
  type,
  setType,
  selectedDays,
  toggleDay
}: FrequencySelectorProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.segmentedControl,
          { backgroundColor: theme.surfaceContainerLow }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.segment,
            type === "everyday" && [
              styles.segmentActive,
              { backgroundColor: theme.surfaceContainerLowest }
            ]
          ]}
          onPress={() => setType("everyday")}
        >
          <Text
            style={[
              styles.segmentText,
              {
                color:
                  type === "everyday" ? theme.primary : theme.onSurfaceVariant,
                fontFamily:
                  type === "everyday" ? "Inter_600SemiBold" : "Inter_500Medium"
              }
            ]}
          >
            Every Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segment,
            type === "specific" && [
              styles.segmentActive,
              { backgroundColor: theme.surfaceContainerLowest }
            ]
          ]}
          onPress={() => setType("specific")}
        >
          <Text
            style={[
              styles.segmentText,
              {
                color:
                  type === "specific" ? theme.primary : theme.onSurfaceVariant,
                fontFamily:
                  type === "specific" ? "Inter_600SemiBold" : "Inter_500Medium"
              }
            ]}
          >
            Specific Days
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.daysContainer}>
        {WEEKDAYS.map((day, index) => {
          const isSelected = selectedDays.includes(index);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCircle,
                {
                  backgroundColor: isSelected
                    ? theme.primary
                    : theme.surfaceContainerLow
                }
              ]}
              onPress={() => toggleDay(index)}
            >
              <Text
                style={[
                  styles.dayText,
                  {
                    color: isSelected
                      ? theme.onPrimary
                      : theme.onSurfaceVariant,
                    fontFamily: "Inter_600SemiBold"
                  }
                ]}
              >
                {day[0].toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  segmentedControl: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 4
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6
  },
  segmentActive: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  segmentText: {
    fontSize: 14
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  dayText: {
    fontSize: 12
  }
});
