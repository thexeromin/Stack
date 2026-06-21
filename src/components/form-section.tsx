import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface FormSectionProps {
  title: string;
  rightElement?: React.ReactNode;
  children: React.ReactNode;
}

export const FormSection = ({
  title,
  rightElement,
  children
}: FormSectionProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.surfaceContainerLowest }
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: theme.onSurfaceVariant, fontFamily: "Inter_500Medium" }
          ]}
        >
          {title}
        </Text>
        {rightElement}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  title: {
    fontSize: 14
  }
});
