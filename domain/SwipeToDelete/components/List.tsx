import React, { FC } from 'react';
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, runOnJS, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

import { TaskInterface } from '../index';

interface ListProps 
    extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    task: TaskInterface;
    onDismiss?: (task: TaskInterface) => void;
}

const { width } = Dimensions.get('window');

const LIST_WIDTH = width * .9 ;
const LIST_HEIGHT= 60

type ContextProps = {
    x: number
}

const SCREEN_WIDTH = width ;

const translateXThreshold = -SCREEN_WIDTH * .3 //30%

const List: FC<ListProps> = ({ task, onDismiss, simultaneousHandlers }) => {
    const translateX = useSharedValue<number>(0);
    const itemHeight = useSharedValue<number>(LIST_HEIGHT);
    const marginVertical = useSharedValue<number>(10);
    const opacityVal = useSharedValue<number>(1);

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextProps>({
        onActive: (event) => {
            translateX.value = event.translationX
        },
        onEnd: () => {
            const shouldDismiss = translateX.value < translateXThreshold ;
            if(shouldDismiss) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0)
                opacityVal.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished && onDismiss){
                        runOnJS(onDismiss)(task);   // runOnJS helps function to run on the JS thread
                    }
                })
            }else{
                translateX.value = withTiming(0);
            }
        },
    });

    const panStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value }
            ],
        }
    });

    const iconStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value < translateXThreshold ? 1 : 0);
        return{ 
            opacity
        }
    });

    const itemHeightStyle = useAnimatedStyle(() => {
        return{
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacityVal.value
        }
    })

  return (
    <Animated.View style={[styles.container, itemHeightStyle]}>
        <PanGestureHandler 
            simultaneousHandlers={simultaneousHandlers} 
            onGestureEvent={panGesture}
        >
            <Animated.View style={[styles.tasks, panStyle]}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            </Animated.View>
        </PanGestureHandler>
        <Animated.View style={[styles.iconContainer, iconStyle]}>
            <FontAwesome5 name={"trash-alt"} style={styles.icon} />
        </Animated.View>
    </Animated.View>
  )
}

export { List };

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width,
        alignItems: 'center'
    },
    tasks: {
        width: LIST_WIDTH,
        height: LIST_HEIGHT,
        borderRadius: 10,
        justifyContent: 'center',
        // shadow for ANDROID
        elevation: 2,
        // Shadow for IOS
        shadowOffset: {
            width: 0,
            height: 20
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        backgroundColor: '#fff'
    },
    taskTitle: {
        fontSize: 14,
        fontFamily: 'Circular',
        color: '#000',
        paddingLeft: 20
    },
    iconContainer: {
        height: LIST_HEIGHT,
        width: LIST_HEIGHT,
        position: 'absolute',
        right: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -10
    },
    icon: {
        fontSize: LIST_HEIGHT * .3,
        color: 'red'
    }
});