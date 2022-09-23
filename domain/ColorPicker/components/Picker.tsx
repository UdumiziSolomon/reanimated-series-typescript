import React, { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useDerivedValue, withSpring, interpolateColor, withTiming } from 'react-native-reanimated';

interface ColorProps extends LinearGradientProps {
  maxWidth: number;
  onColorChanged?: (color: string | number) => void ;
};

const COLOR_PICKER = 35 ;
const INTERNAL_COLOR_PICKER = COLOR_PICKER / 2 ;

type ContextType = {
  x: number,
  absoluteX: number,
}


const Picker: FC<ColorProps> = ({ colors, start, end, style, maxWidth, onColorChanged }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

// to prevent pan to the left side and right side of the picker
  const customTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(0, translateX.value), maxWidth - COLOR_PICKER ) ;
  });

  const onEnd = useCallback(() => {
    'worklet';
      translateY.value = withSpring(0) ;
      scale.value = withSpring(1);
  }, [])
  
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
      onStart: (_, context) => {
        context.x = customTranslateX.value;
        translateY.value = withSpring(-COLOR_PICKER - 10) ;
        scale.value = withSpring(1.2);
      },
      onActive: (event, context) => {
        translateX.value = event.translationX + context.x;
      },
      onEnd
  });

  const translationXStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: customTranslateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ]
    }
  });

  const InternalStyle = useAnimatedStyle(() => {
    // ==> logic is to get the index prior to the translatex value and check with the width of the picker
    const inputRange = colors.map((_, index) => (index / colors.length) * maxWidth  )

    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colors
    );

    onColorChanged?.(backgroundColor);

    return {
      backgroundColor
    }
  });

  // COLOR TAP
    const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent, ContextType>({
      onStart: (event) => {
        translateX.value = withTiming(event.absoluteX - COLOR_PICKER );
        translateY.value = withSpring(-COLOR_PICKER - 10) ;
        scale.value = withSpring(1.2);
      },
      onEnd
    })

  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View>
            <LinearGradient 
              colors={colors}
              style={style}
              start={start}
              end={end}
            />
            <Animated.View style={[ styles.picker, translationXStyle ]}>
              <Animated.View style={[ styles.internalPicker, InternalStyle ]} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}

export default Picker;

const styles = StyleSheet.create({
  picker: {
    position: 'absolute',
    width: COLOR_PICKER,
    height: COLOR_PICKER,
    backgroundColor: '#fff',
    borderRadius: COLOR_PICKER / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  internalPicker: {
    width: INTERNAL_COLOR_PICKER,
    height: INTERNAL_COLOR_PICKER,
    borderRadius: INTERNAL_COLOR_PICKER / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)'
  }
})