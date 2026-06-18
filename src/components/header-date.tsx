import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";

export function HeaderDate() {
  const theme = useTheme() as any;

  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric"
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.onSurface }]}>Today</Text>
      <Text style={[styles.date, { color: theme.outline }]}>
        {formattedDate}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    marginBottom: 4
  },
  date: {
    fontFamily: "Inter_400Regular",
    fontSize: 16
  }
});
