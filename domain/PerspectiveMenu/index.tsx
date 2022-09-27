import React, { FC, useCallback } from 'react';
import { StyleSheet, Dimensions, View, StatusBar } from 'react-native';
import Animated, { useAnimatedGestureHandler, useSharedValue, withTiming, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { PanGestureHandler,  PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type ContextType = {
  x: number
}

const THRESHOLD = width / 3 ;

const PerspectiveMenu:FC = () => {

  const translateX = useSharedValue<number>(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_, context) => {
      context.x = translateX.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      if(translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      }else{
        translateX.value =withTiming(width / 2);
      }
    }
  });

  const reanimatedStyle = useAnimatedStyle(() => {

    const rotateInterpolate = interpolate(
      translateX.value,
      [0, width / 2],
      [0, 3],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      [0, width / 2],
      [0, 15],
      Extrapolate.CLAMP
    );


    return {
      borderRadius,
      transform: [
        { perspective: 100 },
        { translateX: translateX.value },
        { rotateY: `${-rotateInterpolate}deg` }
      ]
    }
  });

  const onPress = useCallback(() => {
    if(translateX.value > 0) {
      translateX.value = withTiming(0) ;
    }else{
      translateX.value = withTiming(width / 2) ; 
    }
  } , []);


  return (
    <View style={styles.container}>
      <StatusBar 
          translucent 
          backgroundColor='#1e1e23' 
          barStyle={'light-content'}  
      />
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.main, reanimatedStyle]}>
          <Feather onPress={onPress} name="menu" size={25} color="black" style={{ padding: 20 }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

export default PerspectiveMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e23',
    width,
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight
  }
})