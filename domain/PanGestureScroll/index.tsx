import React, { FC } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Page } from './components/Page';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, withDecay, useDerivedValue, cancelAnimation } from 'react-native-reanimated';

// Text to be displayed on each screen
const PAGE_TEXTS = [
    "HELLO",
    "WORLD",
    "MOBILE",
    "DEVS"
  ]

const { width } = Dimensions.get('window');

type ContextType = {
    x: number
}   

// MAX page width to avoid scroll to the right
const MAX_LENGTH = - width * (PAGE_TEXTS.length - 1);

const PanGestureScroll: FC = () => {
    const translateX = useSharedValue(0);

    const clampedTranslateX = useDerivedValue(() => {  
        // to avoid scroll to tne right
        return Math.max(Math.min(translateX.value, 0), MAX_LENGTH);
    })

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (_, context) => {
            context.x = clampedTranslateX.value
            cancelAnimation(translateX);  //to stop the decay animation at the end of each pan scroll
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x
        },
        onEnd: (event) => {
            translateX.value = withDecay({ velocity: event.velocityX }) // translation moves with scroll force
        }
    });

  return (
    <View style={styles.container}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={{ flex: 1, flexDirection: 'row', width }}>
                { PAGE_TEXTS.map((dto, index) => (
                    <Page
                        key={index.toString()}
                        index={index}
                        title={dto}
                        translateX={clampedTranslateX}
                    />
                ))}
            </Animated.View>
        </PanGestureHandler>
    </View>
  )
}

export default PanGestureScroll;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});