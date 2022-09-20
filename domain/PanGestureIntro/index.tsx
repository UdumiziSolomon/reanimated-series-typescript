import React, { FC, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated' ;
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

// Square size
const SQUARE_SIZE = 80.0
const CIRCLE_RADIUS = SQUARE_SIZE * 2

type ContextType = {
    translateX: number,
    translateY: number
}

const PanGestureIntro: FC = () => {
    const translateX = useSharedValue<number>(0)
    const translateY = useSharedValue<number>(0);


    // Function to handle the pan gesture
    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },    // start of gesture
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },    // during gesture
        onEnd: () => {
            
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

            if(distance < CIRCLE_RADIUS + SQUARE_SIZE / 2) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        },      //after gesture completion
    });

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        }
    })


  return (
    <View style={styles.container}>
        {/* PanGestureHandler needs to parent any View to be panned */}
        <View style={styles.pCircle}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[ 
                    styles.square, 
                    reanimatedStyle 
                ]}/>
            </PanGestureHandler>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    square: {
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        backgroundColor: '#36ac',
        borderRadius: 20,
    },
    pCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#36ac',
        borderWidth: 5,
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS 
    }
})

export default PanGestureIntro;