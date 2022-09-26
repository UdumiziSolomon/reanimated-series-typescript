import React, { FC, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, View, StatusBar, TouchableOpacity, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg' ;
import Animated, { useAnimatedProps, useSharedValue, withTiming, useDerivedValue } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

const BACKGROUND_COLOR = '#444b6f';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#aee1f4';

const { width, height } = Dimensions.get('window');

const CIRCLE_LENGTH = 1000 ;    // 2PI * R
const RAD = CIRCLE_LENGTH / (2 * Math.PI);

const CircularProgressBar: FC = () => {

    const progress = useSharedValue(0);
    const progressTextValue = useDerivedValue(() => {
        return `${Math.floor(progress.value * 100 )}`
    })

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    // SInce we cant style props directly, we have to use an animated prop to style it 
    const AnimatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    }))


    const onPress = useCallback(() => {
        // Progress value > 0 should move from 0 - 1, and vice versa ==> reverse animation
        progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
    }, [])

  return (
    <View style={styles.container}>
        <StatusBar
          translucent 
          backgroundColor={BACKGROUND_COLOR} 
          barStyle={'light-content'}  
        />

        {/* Retext ==> Text from redash helps to animate text value on the UI thread */}
        <ReText
            style={styles.text} 
            text={progressTextValue}
        />

        {/* SVG */}
        <Svg style={{ alignSelf: 'center', marginTop: 70 }}>
            {/* BASE CIRCLE */}
            <Circle
                cx={ width / 2 }
                cy={ height / 2 }
                r={RAD}
                stroke={BACKGROUND_STROKE_COLOR}
                strokeWidth={30}
            />
            {/* INTERNAL STROKE CIRCLE */}
             <AnimatedCircle
                cx={ width / 2 }
                cy={ height / 2 }
                r={RAD}
                stroke={STROKE_COLOR}
                strokeWidth={15}
                strokeDasharray={CIRCLE_LENGTH}
                animatedProps={AnimatedProps}
                strokeLinecap={"round"}
            />
        </Svg>
        {/*  Btn to run the animation */}
        <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Text style={styles.btnText}> ACTIVATE </Text>
        </TouchableOpacity>
    </View>
  )
}

export default CircularProgressBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUND_COLOR,
        flex: 1,
        width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Gotham',
        color: STROKE_COLOR,
        fontSize: 70,
        alignSelf: 'center',
        position: 'absolute',
        width: 200,
        textAlign: 'center',
    },
    btn: {
        positon: 'absolute',
        bottom: 100,
        width: width * .7,
        backgroundColor: BACKGROUND_STROKE_COLOR,
        paddingVertical: 15,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: STROKE_COLOR,
        fontFamily: 'Gotham',
        fontSize: 17
    }
});