import { View, StyleSheet } from "react-native";
import {
  MaterialDesignIcons,
  MaterialDesignIconsIconName
} from "@react-native-vector-icons/material-design-icons";
import { useTheme } from "@/hooks/use-theme";

const ICON_SIZE = 26;

export const TabIcon = ({
  name,
  focused,
  isInsights
}: {
  name: MaterialDesignIconsIconName;
  focused: boolean;
  isInsights?: boolean;
}) => {
  const theme = useTheme();
  const color = focused ? theme.primary : theme.outline;

  if (isInsights && focused) {
    return (
      <View
        style={[styles.activeIconContainer, { backgroundColor: theme.primary }]}
      >
        <MaterialDesignIcons
          name={name}
          size={ICON_SIZE - 4}
          color={theme.onPrimary}
        />{" "}
      </View>
    );
  }

  return (
    <View style={styles.iconContainer}>
      <MaterialDesignIcons name={name} size={ICON_SIZE} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  activeIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -5
  }
});
