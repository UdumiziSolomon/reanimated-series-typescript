import React, { FC, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withTiming } from 'react-native-reanimated';

const SQUARE_SIZE = 100.0 ;

// WORKLET FUNCTION
const handleRotation = (val: Animated.SharedValue<number>) => {
    'worklet';    // ==> helps function in JS Thread run on the UI Thread

    // Function body
    return `${val.value * 2 * Math.PI}rad`;
}

const Intro: FC = () => {

    // define values that can be shared dynamically on the UI thread with useSharedValue
        // Opacity val
    const opacityValue = useSharedValue<number>(1);
        // Scale val
    const scaleValue = useSharedValue<number>(1)

    const reanimatedStyle = useAnimatedStyle(() => ({
        opacity: opacityValue.value,
        borderRadius: opacityValue.value * SQUARE_SIZE / 2,
        transform: [
            { scale: scaleValue.value },
            {
                rotate: `${opacityValue.value * 2 * Math.PI}rad`
                // rotate: handleRotation(opacityValue),    // ==> incase calculation is more complex use worklet function }],
            }
        ]
    }),[]);


    useEffect(() => {
        opacityValue.value = withSpring(0.9);
        // scaleValue.value = withSpring(2);

            // REPEATING ANIMATIONS
        // *s = the changing param value, 
        // *n = number of repitition, 
        // *b = boolean for reverse

        scaleValue.value = withRepeat(withSpring(2), 10, true)  // ==> repeat(*s,*n,*b)


    }, []);

  return (
    <View style={styles.container}>
        <Animated.View style={[ 
            styles.square, 
            reanimatedStyle
        ]}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    square: {
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        backgroundColor: '#36ac',
    }
})

export default Intro;