import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import {
  MaterialDesignIcons,
  MaterialDesignIconsIconName
} from "@react-native-vector-icons/material-design-icons";
import { useTheme } from "@/hooks/use-theme";

interface StatCardProps {
  title: string;
  iconName: MaterialDesignIconsIconName;
  iconColor: string;
  iconBgColor: string;
  value: string;
  subValue: string;
  subValueIcon?: MaterialDesignIconsIconName;
  subValueColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function StatCard({
  title,
  iconName,
  iconColor,
  iconBgColor,
  value,
  subValue,
  subValueIcon,
  subValueColor,
  style
}: StatCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surfaceContainerLowest,
          borderColor: theme.surfaceContainerHighest
        },
        style
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <MaterialDesignIcons name={iconName} size={16} color={iconColor} />
        </View>
        <Text style={[styles.title, { color: theme.onSurfaceVariant }]}>
          {title}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.value, { color: theme.onSurface }]}>{value}</Text>
        <View style={styles.subValueContainer}>
          {subValueIcon && (
            <MaterialDesignIcons
              name={subValueIcon}
              size={14}
              color={subValueColor || theme.onSurfaceVariant}
              style={styles.subValueIcon}
            />
          )}
          <Text
            style={[
              styles.subValue,
              { color: subValueColor || theme.onSurfaceVariant }
            ]}
          >
            {subValue}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 28,
    padding: 20,
    minHeight: 140,
    justifyContent: "space-between"
  },
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  title: {
    fontSize: 15,
    fontFamily: "Inter_500Medium"
  },
  content: {
    marginTop: 12
  },
  value: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
    marginBottom: 6
  },
  subValueContainer: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  subValueIcon: {
    marginRight: 4,
    marginTop: 2
  },
  subValue: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    lineHeight: 18,
    flex: 1
  }
});
