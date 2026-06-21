import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useTheme } from "@/hooks/use-theme";

const COLORS = [
  "#2170e4", // Blue
  "#6cf8bb", // Light green
  "#b75b00", // Orange/Brown
  "#ffdad6", // Pink light
  "#a050ff", // Purple
  "#f03e82" // Pink strong
];

interface ColorSelectorProps {
  selectedColor: string;
  onSelect: (color: string) => void;
}

export const ColorSelector = ({
  selectedColor,
  onSelect
}: ColorSelectorProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {COLORS.map((color) => {
        const isSelected = selectedColor === color;
        return (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorCircle,
              { backgroundColor: color },
              isSelected && {
                borderWidth: 2,
                borderColor: theme.primary,
                padding: 2
              }
            ]}
            onPress={() => onSelect(color)}
          >
            {isSelected ? (
              <View style={[styles.innerCircle, { backgroundColor: color }]}>
                <MaterialDesignIcons name="check" size={20} color="#ffffff" />
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16
  },
  colorCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center"
  },
  innerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center"
  }
});
