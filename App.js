import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import bg from './assets/bg.jpeg'
export default function App() {
  const [map, setMap] = useState([
    ['x','x','O'], //1st row
    ['O','x','x'], //2nd row
    ['O','O','x'], //3rd row
  ]);
  const onPress = () => {
    console.warn("hello");
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg}>
        <View style={styles.map}>
          {map.map(row => (
            <Pressable onPress = {() => onPress()} style={styles.row}>
              {row.map((cell) => <View style={styles.cell}>
              
              {cell == 'O' && <View style={styles.circle} resizeMode="contain" />}
              {cell == 'x' && <View style={styles.cross}>
                              <View style={styles.crossLine} />
                              <View style={[styles.crossLine, styles.crossLineReversed]} />
                              </View>}
              </View>
              )}
            </Pressable>
            
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242034',
  },
  bg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  circle: {

    flex: 1,
    width: 75,
    height: 75,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 50,
    margin: 10,
    borderWidth: 10,
    borderColor: 'white', 
  },
  row: {
    flex: 1,
    flexDirection: "row", 
    
  },
  crossLine: {
    position: 'absolute',
    left: "40%",
    width: 10,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    transform: [{ rotate: '45deg' }, 
    ]
  },
  crossLineReversed: {
    transform: [
      {rotate: '-45deg'}
    ]
  },
  map: {
    borderWidth: 1,
    borderColor: "white",
    width: "80%",
    aspectRatio: 1,
  },
  cell: {
    width:100,
    height: 100,
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
  },
  cross: {
    flex: 1,
  }
});
