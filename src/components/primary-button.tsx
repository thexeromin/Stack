import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

export const PrimaryButton = ({ title, onPress }: PrimaryButtonProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.primary }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          { color: theme.onPrimary, fontFamily: "Inter_600SemiBold" }
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 16
  }
});
