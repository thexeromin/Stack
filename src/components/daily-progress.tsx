import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { CircularProgress } from "./circular-progress";

export function DailyProgress() {
  const theme = useTheme() as any;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.surfaceContainerLowest }
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.subtitle, { color: theme.outline }]}>
          Daily Progress
        </Text>
        <Text style={[styles.title, { color: theme.onSurface }]}>
          1 of 4 completed
        </Text>
      </View>
      <CircularProgress progress={25} size={72} strokeWidth={8} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 24
  },
  textContainer: {
    flex: 1
  },
  subtitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    marginBottom: 4
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 20
  }
});
