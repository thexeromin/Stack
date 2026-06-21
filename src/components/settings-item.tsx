import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  MaterialDesignIcons,
  MaterialDesignIconsIconName
} from "@react-native-vector-icons/material-design-icons";
import { useTheme } from "@/hooks/use-theme";
import { CustomSwitch } from "./custom-switch";

interface SettingsItemProps {
  icon: MaterialDesignIconsIconName;
  iconColor: string;
  iconBgColor: string;
  title: string;
  value?: string;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  showChevron?: boolean;
  isLast?: boolean;
  onPress?: () => void;
}

export const SettingsItem = ({
  icon,
  iconColor,
  iconBgColor,
  title,
  value,
  isSwitch,
  switchValue,
  onSwitchChange,
  showChevron,
  isLast,
  onPress
}: SettingsItemProps) => {
  const theme = useTheme();

  const Container = onPress ? TouchableOpacity : View;

  return (
    <View>
      <Container
        style={styles.container}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.7}
      >
        <View style={styles.leftContent}>
          <View
            style={[styles.iconContainer, { backgroundColor: iconBgColor }]}
          >
            <MaterialDesignIcons name={icon} size={20} color={iconColor} />
          </View>
          <Text
            style={[
              styles.title,
              { color: theme.onSurface, fontFamily: "Inter_500Medium" }
            ]}
          >
            {title}
          </Text>
        </View>

        <View style={styles.rightContent}>
          {value && (
            <Text
              style={[
                styles.value,
                {
                  color: theme.onSurfaceVariant,
                  fontFamily: "Inter_400Regular"
                }
              ]}
            >
              {value}
            </Text>
          )}

          {isSwitch && (
            <CustomSwitch
              value={!!switchValue}
              onValueChange={onSwitchChange || (() => {})}
              activeColor={theme.primary}
              inactiveColor={theme.surfaceContainerHighest}
              thumbColor={theme.surfaceContainerLowest}
            />
          )}

          {showChevron && !isSwitch && (
            <MaterialDesignIcons
              name="chevron-right"
              size={24}
              color={theme.outlineVariant}
            />
          )}
        </View>
      </Container>
      {!isLast && (
        <View style={styles.separatorContainer}>
          <View
            style={[
              styles.separator,
              { backgroundColor: theme.surfaceContainerHigh }
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 64
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 16
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  value: {
    fontSize: 14
  },
  separatorContainer: {
    paddingHorizontal: 0
  },
  separator: {
    height: 1
  }
});
