import { Text, View, StyleSheet } from "react-native";

export default function Add() {
  return (
    <View style={styles.container}>
      <Text>Add</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
