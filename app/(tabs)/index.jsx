import React from "react";
import { StyleSheet, View } from "react-native";
import DrawingBoard from "./DrawingBoard";

export default function App() {
  return (
    <View style={styles.container}>
      <DrawingBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
