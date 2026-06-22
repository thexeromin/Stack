import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useTheme } from "@/hooks/use-theme";
import { HABIT_ICONS } from "@/constants/habit";

interface IconSelectorProps {
  selectedIcon: string;
  onSelect: (icon: string) => void;
}

export const IconSelector = ({ selectedIcon, onSelect }: IconSelectorProps) => {
  const theme = useTheme();

  return (
    <View style={styles.grid}>
      {HABIT_ICONS.map((icon) => {
        const isSelected = selectedIcon === icon;
        return (
          <TouchableOpacity
            key={icon}
            style={[
              styles.iconButton,
              {
                backgroundColor: isSelected
                  ? theme.primary
                  : theme.surfaceContainerLow
              }
            ]}
            onPress={() => onSelect(icon)}
          >
            <MaterialDesignIcons
              name={icon as any}
              size={24}
              color={isSelected ? theme.onPrimary : theme.onSurface}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
// Screen width - 2 * 16 (main padding) - 2 * 16 (card padding) = windowWidth - 64
// 4 items with 12px gap between them => 3 * 12 = 36px total gap
// Item width = (windowWidth - 64 - 36) / 4
const ITEM_WIDTH = Math.floor((windowWidth - 100) / 4);

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between"
  },
  iconButton: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  }
});
