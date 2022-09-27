import React, { FC } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, useAnimatedRef, measure } from 'react-native-reanimated';

interface RippleProps {
    style? : StyleProp<ViewStyle>;
    onTap?: () => void;
}

const Ripple: FC<RippleProps> = ({ style, onTap, children }) => {

  const centerX = useSharedValue<number>(0);
  const centerY = useSharedValue<number>(0);
  const scale = useSharedValue<number>(0); 

  const width = useSharedValue<number>(0);
  const height = useSharedValue<number>(0);
  const opacityVal = useSharedValue<number>(1); 


  const aRef = useAnimatedRef<View>();


  const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: (tapEvent) => {

      const layout = measure(aRef);   // measure helps to get the width and height of a particular referenced view on the ui thread amongst other info
      width.value = layout.width;
      height.value = layout.height;

      centerX.value = tapEvent.x;
      centerY.value = tapEvent.y;

      opacityVal.value = 1
      scale.value = 0;
      scale.value = withTiming(1, { duration: 1000 });
    },
    onActive: () => {
      if (onTap)  runOnJS(onTap) () ;
    },
    onFinish: () => {
      opacityVal.value = withTiming(0)
    },
  }); 

  const circleStyle = useAnimatedStyle(() => {

    const circleRadius = Math.sqrt(width.value ** 2+ height.value ** 2);   // get the diagonal of the circle
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2, 
      borderRadius: circleRadius,
      backgroundColor: 'rgba(0,0,0,0.2)',
      position: 'absolute',
      opacity: opacityVal.value,
      top: 0,
      left:0,
      transform: [
        { translateX }, 
        { translateY },
        { scale: scale.value },
      ]
    }
  })

  return (
    <View ref={aRef} style={style}>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View  style={[style, { overflow: 'hidden' }]}>
        <View>{children}</View>
        <Animated.View style={[circleStyle]} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  )
}

export default Ripple;

const styles = StyleSheet.create({

})