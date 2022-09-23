import React, { FC } from 'react';
import { StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const imageURI = 'https://images.unsplash.com/photo-1570527140771-020891229bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60';

const { width, height } = Dimensions.get('window');

type ContextType = {
  scale: number,
  focalX: number,
  focalY: number
}

const PinchGesture: FC = () => {

  const scaleValue = useSharedValue<number>(1);
  const focalX = useSharedValue<number>(0);
  const focalY = useSharedValue<number>(0);

  // NB: Pinch from all spots require you pinch from a particular focal point and not just scaling the image(object)


    const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent, ContextType>({
        onActive: (event) => {
          scaleValue.value = event.scale;
          focalX.value = event.focalX;
          focalY.value = event.focalY;
        },
        onEnd: () => {
          scaleValue.value = withTiming(1)
        }
    });

    const pinchStyle = useAnimatedStyle(() => {
      return{
        // offset the translates to fit the scale and return them back to its former values
        transform: [
          { translateX: focalX.value },
          { translateY: focalY.value },
          { translateX: -width / 2 },
          { translateY: -height / 2 },
          { scale: scaleValue.value },
          { translateX: -focalX.value },
          { translateY: -focalY.value },
          { translateX: width / 2 },
          { translateY: height / 2 },
        ]
      }
    });

    const focalStyle = useAnimatedStyle(() => {
      return{
        transform: [
          { translateX: focalX.value },
          { translateY: focalY.value },
        ]
      }
    })

      // create an animated image component since gestures require a component has to be animated   ==> other optios include Animated.Image and wrapping your image with Animated.View
    const AnimatedImage = Animated.createAnimatedComponent(Image);   // custom methodology

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      {/* Status bar height might cover our focal point absolute fill if not stated */}
      <Animated.View style={{ flex: 1, marginTop: StatusBar.currentHeight }}> 
        <AnimatedImage
          style={[styles.image, pinchStyle]} 
          source={{ uri: imageURI }}
        />
        <Animated.View style={[ styles.focalPoint, focalStyle ]} />
      </Animated.View>
    </PinchGestureHandler>
  )
}

export default PinchGesture;

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width,
        height
    },
    focalPoint: {
      ...StyleSheet.absoluteFillObject,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#336699',
      zIndex: -100   // uncomment to see the focal display
    }
});