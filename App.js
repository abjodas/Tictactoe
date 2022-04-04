import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import bg from "./assets/bg.jpeg";
export default function App() {
  const [map, setMap] = useState([
    ["", "", ""], //1st row
    ["", "", ""], //2nd row
    ["", "", ""], //3rd row
  ]);

  const [currentTurn, setCurrentTurn] = useState("x");

  const onPress = (rowIndex, cellIndex) => {
    console.warn("hello", rowIndex, cellIndex);
    if (map[rowIndex][cellIndex] != "") {
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][cellIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn == "x" ? "O" : "x");

    checkWinningState();
  };

  const checkWinningState = () => {
    //Check rows
    for (let i = 0; i < 3; i++) {
      const isRowXWinning = map[i].every((cell) => cell == "x");
      const isRowOWinning = map[i].every((cell) => cell == "O");
      if (isRowXWinning) {
        Alert.alert("X won. Row");
      }
      if (isRowOWinning) {
        Alert.alert("O won. Row");
      }
    }
    //Check coumns
    for (let col = 0; col < 3; col++) {
      let isColumnXWinner = true;
      let isColumnOWinner = true;

      for (let row = 0; row < 3; row++) {
        if (map[row][col] != "x") {
          isColumnXWinner = false;
        }
        if (map[row][col] != "O") {
          isColumnOWinner = false;
        }
      }
      if (isColumnXWinner) {
        Alert.alert("X won. Column");
      }
      if (isColumnOWinner) {
        Alert.alert("O won. Column");
      }
    }
    //Check diagonals
    // for (let row = 0; row < 3; row++) {
    //   let isDiagonalXWinner = true;
    //   let isDiagonalOWinner = true;
    //   for (let col = 0; col < 3; col++) {
    //     if (map[row][col] != "x") {
    //       if (row == col) {
    //         isDiagonalXWinner = false;
    //       }
    //     }
    //     if (map[row][col] != "O") {
    //       if (row == col) {
    //         isDiagonalOWinner = false;
    //       }
    //     }
    //   }
    //   if (isDiagonalXWinner) {
    //     Alert.alert("X won. Diagonal");
    //   }
    //   if (isDiagonalOWinner) {
    //     Alert.alert("O won. Diagonal");
    //   }
    // }
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <Pressable
                  key={`row-${rowIndex}-col-${cellIndex}`}
                  onPress={() => onPress(rowIndex, cellIndex)}
                  style={styles.cell}
                >
                  {cell == "O" && (
                    <View style={styles.circle} resizeMode="contain" />
                  )}
                  {cell == "x" && (
                    <View style={styles.cross}>
                      <View style={styles.crossLine} />
                      <View
                        style={[styles.crossLine, styles.crossLineReversed]}
                      />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          ))}

          {/* <View style={styles.circle} resizeMode="contain" />
        <View style={styles.cross}>
          <View style={styles.crossLine} />
          <View style={[styles.crossLine, styles.crossLineReversed]} />
        </View> */}
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#242034",
  },
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  circle: {
    flex: 1,
    width: 75,
    height: 75,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 50,
    margin: 10,
    borderWidth: 10,
    borderColor: "white",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  crossLine: {
    position: "absolute",
    left: "40%",
    width: 10,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    transform: [{ rotate: "45deg" }],
  },
  crossLineReversed: {
    transform: [{ rotate: "-45deg" }],
  },
  map: {
    // borderWidth: 1,
    // borderColor: "white",
    width: "80%",
    aspectRatio: 1,
  },
  cell: {
    width: 100,
    height: 100,
    flex: 1,

    // borderWidth: 1,
    // borderColor: "white",
  },
  cross: {
    flex: 1,
  },
});
