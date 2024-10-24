import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";

const HandwritingText = ({ text, speed = 100, logoSource }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    context.font = "24px cursive"; // Ajusta la fuente
    context.fillStyle = "black"; // Color del texto
    context.textBaseline = "top"; // Alineación vertical

    let index = 0;
    let x = 10; // Posición inicial en el eje x

    const drawText = () => {
      if (index < text.length) {
        context.fillText(text.charAt(index), x, 10); // Dibuja el carácter en la posición (x, 10)
        x += context.measureText(text.charAt(index)).width; // Mueve la posición x para el siguiente carácter
        index++;
        setTimeout(drawText, speed); // Llama a la función recursivamente
      }
    };

    drawText(); // Inicia el dibujo

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Limpia al desmontar
    };
  }, [text, speed]);

  return (
    <View style={styles.textContainer}>
      <View style={styles.content}>
        <canvas
          ref={canvasRef}
          width={800}
          height={100}
          style={styles.canvas}
        />
        {logoSource && <Image source={logoSource} style={styles.logo} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    marginTop: "30vh",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  canvas: {
    border: "1px solid transparent", // Para ver los límites del canvas si es necesario
  },
  logo: {
    width: 500, // Ajusta el tamaño según sea necesario
    height: 500, // Ajusta el tamaño según sea necesario
    marginLeft: 10, // Espaciado entre el texto y el logo
  },
});

export default HandwritingText;
