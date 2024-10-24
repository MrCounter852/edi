import React, { useState } from "react";
import { PanResponder, View } from "react-native";
import Svg, { Polyline } from "react-native-svg";

const DrawingBoard = () => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const newPoint = { x: gestureState.moveX, y: gestureState.moveY };
      setCurrentLine((prev) => [...prev, newPoint]);
    },
    onPanResponderRelease: () => {
      setLines((prev) => [...prev, currentLine]);
      setCurrentLine([]);
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
