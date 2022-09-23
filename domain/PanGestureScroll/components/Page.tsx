import React, { FC } from 'react';
import { StyleSheet, Text, Dimensions, StatusBar } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface PageProps {
    index: number;
    title: string;
    translateX: Animated.SharedValue<number>
}

const { width } = Dimensions.get('window');

const Page: FC<PageProps> = ({ title, index, translateX }) => {

    const pageOffset = width * index ;

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform : [
                { translateX: translateX.value + pageOffset }
            ]
        }
    })

  return (
    <Animated.View style={[styles.container, { backgroundColor: `rgba(0,0,256,0.${index + 3})` }, reanimatedStyle]}>
        <StatusBar 
         translucent 
         backgroundColor={'rgba(0,0,256,0.1)'} 
         barStyle={'dark-content'}  
       />
        <Text style={styles.text}>{title}</Text>
    </Animated.View>
  )
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    text: {
        fontFamily: 'Gotham',
        fontSize: 50,
        color: '#fff'
    }
});

export { Page };