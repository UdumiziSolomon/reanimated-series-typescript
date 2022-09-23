import React, { FC, useCallback } from 'react';
import { StyleSheet, View, Dimensions, Text, StatusBar } from 'react-native';
import Picker from './components/Picker';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';


const COLORS = [
    "red", "purple", "blue", "cyan", "green", "yellow", "orange", "black", "white"
]

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';

const { width, height } = Dimensions.get('window');

const PICKER_WIDTH = width * .9 ;
const CIRCLE_WIDTH = width * 0.8 ;

const ColorPicker: FC = () => {

  const pickedColor = useSharedValue<string | number>(COLORS[0]);

  const pickedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value
    }
  });


  const onColorChanged = useCallback((color: string | number) =>{
    'worklet'

    pickedColor.value = color;
  }, []);


  return (
    <>
     <StatusBar 
        translucent 
        backgroundColor={BACKGROUND_COLOR } 
        barStyle={'light-content'}  
      />
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, pickedStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <Picker 
          colors={COLORS}
          style={styles.colorLayer}
          start={{ x:0, y: 0 }}
          end={{ x:1, y: 0 }} 
          maxWidth={PICKER_WIDTH}
          onColorChanged={onColorChanged}
        />
      </View>
    </>
  )
}

export default ColorPicker;

const styles = StyleSheet.create({
    topContainer: {
        flex: 3,
        backgroundColor: BACKGROUND_COLOR,
        width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    colorLayer: {
      width: PICKER_WIDTH,
      height: 35,
      alignSelf: 'center',
      borderRadius: 20
    },
    circle: {
      width: CIRCLE_WIDTH,
      height: CIRCLE_WIDTH,
      borderRadius: CIRCLE_WIDTH / 2,
    }
});