import React from "react";
import { StyleSheet, View } from "react-native";
import DrawingBoard from "./DrawingBoard";
import HandwritingText from "./HandwritingText";

export default function App() {
  return (
    <View style={styles.container}>
      <HandwritingText
        text="Hola a todos en Platzi Live, soy Edi <3"
        logoSource={require("../../assets/common/fondo.png")}
      />

      <DrawingBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative", // Asegúrate de que el contenedor permita la superposición
  },
});
