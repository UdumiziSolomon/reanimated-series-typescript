import React, { FC, useState, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring, interpolate, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const ICON_SIZE = 18;
const BUTTON_WIDTH = 180;

// clap function to help the pan gesture to remain in button width
const clamp = (value: number, min: number, max: number) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

const Counter: FC = () => {

  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  // state
  const [count, setCount] = useState<number>(0)

  const MAX_OFFSET = BUTTON_WIDTH * .4

  // Increment func
  const incrementFunc = useCallback(() => {
    // external library func
    setCount(currentCount => currentCount + 1 );
  }, []);

  // Increment func
  const decrementFunc = useCallback(() => {
    setCount(currentCount => currentCount - 1 );
  }, []);

    // reset count
  const resetFunc = useCallback(() => {
    setCount(0);
  }, []);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {},
    onActive: (event) => {
      translateX.value = clamp(event.translationX, -MAX_OFFSET, MAX_OFFSET);
      translateY.value = clamp(event.translationY, 0, MAX_OFFSET)                                                                                                                                                        
    },
    onEnd: () => {
      // INCREMENT AND DECREMENT
      if(translateX.value === MAX_OFFSET) {
        // Increment
        runOnJS(incrementFunc)();
      }else if(translateX.value === -MAX_OFFSET){
        // decrement
        runOnJS(decrementFunc)();
      }
      else if(translateY.value === MAX_OFFSET){
        // decrement
        runOnJS(resetFunc)();
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ]
    }
  });

  const rPlusMinusStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_OFFSET, 0 , MAX_OFFSET], 
      [0.4,0.8,0.4]
    );

    const opacityY = interpolate(
      translateY.value,
      [0 , MAX_OFFSET],   // opacity should be zero if we're moving on the vertical axis
      [1, 0]
    );
    return {
      opacity: opacityX * opacityY
    }
  });

  const closeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0 , MAX_OFFSET], 
      [0, 0.8]
    );

    return {
      opacity
    }
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value * 0.1 },
        { translateY: translateY.value * 0.1 }
      ]
    }
  })


  return (
    <Animated.View style={[styles.button, buttonStyle]}>

      <Animated.View style={[rPlusMinusStyle]}>
        <AntDesign name="minus" color="#fff" size={ICON_SIZE} />
      </Animated.View>

      <Animated.View style={closeStyle}>
        <AntDesign name="close" color="#fff" size={ICON_SIZE} />
      </Animated.View>

      <Animated.View style={[rPlusMinusStyle]}>
        <AntDesign name="plus" color="#fff" size={ICON_SIZE} />
      </Animated.View>

      <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center'}}>
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View style={[ styles.circle, reanimatedStyle ]}>
            <Text style={styles.countText}>{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>

    </Animated.View>
  )
}

export default Counter;

const styles = StyleSheet.create({
  button: {
    height: 70,
    width: 180,
    borderRadius: 50,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#232323',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  countText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Gotham'
  }
});