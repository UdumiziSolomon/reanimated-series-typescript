import React, { FC, useRef, useCallback } from 'react';
import { StyleSheet, View , Image, Dimensions, ImageBackground } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, withTiming } from 'react-native-reanimated';

// ==> HANDLING DOUBLE AND SINGLE TAP GESTURES

const { width, height } = Dimensions.get('window');
const mainImg = require('../../assets/images/image.jpg');
const subImg = require('../../assets/images/heart.png');

const SingleAndDoubleTap: FC = () => {
  const doubleTapRef = useRef<any>();
  const scale = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(1)

  // image component
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: Math.max(scale.value, 0) }   //to ensure that spring animation stays in range of >1
      ]
    }
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  // callback for doubletap
  const doubleTapCallBack = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if(isFinished) {
        scale.value = withDelay(300, withSpring(0));  //delay to cause a delay ==> Instagram like btn
      }
    });
  }, []);

  // callback for singletap
  const singleTapCallBack = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if(isFinished) {
        opacity.value = withDelay(300, withTiming(1));  //delay to cause a delay ==> Instagram like btn
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler     // tap gesture for single tap
        waitFor={doubleTapRef}
        onActivated={singleTapCallBack}
      >
        <TapGestureHandler   // tap gesture for double tap
          maxDelayMs={250}  // to optimize the delay time to show the single tap
          ref={doubleTapRef}
          numberOfTaps={2}  // no of taps
          onActivated={doubleTapCallBack}
        >
          <Animated.View style={styles.container}>
            <ImageBackground 
              source={mainImg} 
              style={styles.img}
            >
            <AnimatedImage 
              source={subImg} 
              style={[ styles.imgChild, reanimatedStyle]} 
              resizeMode="contain" 
            />
            </ImageBackground>
            
          {/* to demonstrate the single tap animation */}
          <Animated.Text style={[ styles.textIcon, textStyle ]}> 😻😻😻😻😻 </Animated.Text>        
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  )
}

export default SingleAndDoubleTap;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    img: {
      width,
      height: height / 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    imgChild: {
      width: 100,
      height: 100,
    },
    textIcon: {
      marginTop: 20,
      letterSpacing: 10,
      fontSize: 25
    }
})