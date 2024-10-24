import React, { useState } from "react";
import { PanResponder, View } from "react-native";
import Svg, { Polyline } from "react-native-svg";

// Función para interpolar puntos entre dos coordenadas
const interpolatePoints = (start, end, steps) => {
  const points = [];
  const xStep = (end.x - start.x) / steps;
  const yStep = (end.y - start.y) / steps;
  for (let i = 0; i <= steps; i++) {
    points.push({ x: start.x + xStep * i, y: start.y + yStep * i });
  }
  return points;
};

const DrawingBoard = () => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  let lastPoint = null; // Para guardar el último punto

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const newPoint = { x: gestureState.moveX, y: gestureState.moveY };

      // Si hay un último punto, interpolamos entre el último punto y el nuevo punto
      if (lastPoint) {
        const interpolatedPoints = interpolatePoints(lastPoint, newPoint, 5); // 5 pasos de interpolación
        setCurrentLine((prev) => [...prev, ...interpolatedPoints]);
      } else {
        setCurrentLine((prev) => [...prev, newPoint]);
      }

      lastPoint = newPoint; // Actualizar el último punto
    },
    onPanResponderRelease: () => {
      setLines((prev) => [...prev, currentLine]);
      setCurrentLine([]);
      lastPoint = null; // Reiniciar el último punto
    },
  });

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <Svg style={{ flex: 1 }}>
        {lines.map((line, index) => (
          <Polyline
            key={index}
            points={line.map((p) => `${p.x},${p.y}`).join(" ")}
            stroke="black"
            strokeWidth="3"
            fill="none"
          />
        ))}
        {currentLine.length > 0 && (
          <Polyline
            points={currentLine.map((p) => `${p.x},${p.y}`).join(" ")}
            stroke="black"
            strokeWidth="3"
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
};

export default DrawingBoard;
