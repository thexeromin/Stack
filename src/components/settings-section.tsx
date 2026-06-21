import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection = ({ title, children }: SettingsSectionProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { color: theme.outline, fontFamily: "Inter_500Medium" }
        ]}
      >
        {title.toUpperCase()}
      </Text>
      <View
        style={[
          styles.content,
          {
            backgroundColor: theme.surfaceContainerLowest
          }
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 8,
    letterSpacing: 0.5
  },
  content: {
    borderRadius: 16,
    overflow: "hidden"
  }
});
