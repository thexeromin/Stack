import { View, Text, StyleSheet } from "react-native";

export const TabLabel = ({
  focused,
  color,
  children
}: {
  children: string;
  focused: boolean;
  color: any;
  position: any;
}) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={[styles.labelText, { color }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4
  },
  labelText: {
    fontSize: 12,
    fontFamily: "Inter_700Bold"
  }
});
