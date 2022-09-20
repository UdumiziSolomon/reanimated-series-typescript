import React, { FC } from 'react'
import { View, Dimensions, StyleSheet, StatusBar, Text } from 'react-native'
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

interface PageProps {
    title: string;
    index: number;
    translateScrollX: Animated.SharedValue<number>
}

const { width, height } = Dimensions.get('window');
const SQUARE_SIZE = width * 0.7;

const Page: FC<PageProps> = ({ title, index, translateScrollX }) => {

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width ];

  const reanimatedContainer = useAnimatedStyle(() => {

    // Interpolate ==> changes prior to the translateScrollX value in the shared value

    const scale = interpolate(
      translateScrollX.value,
      inputRange,  // scale becomes 1 if our translateX number becomes a screenWidth value which is index * width ( 0 * width ) && ( 1 * width )......
      [0,1,0],
      Extrapolate.CLAMP
    )

    const borderRadius = interpolate(
      translateScrollX.value,
      inputRange,
      [10,SQUARE_SIZE / 2 ,10],
      Extrapolate.CLAMP
    )

    return {
      transform: [
        { scale }
      ],
      borderRadius
    }
  })

  const reanimatedText = useAnimatedStyle(() => {  // needs to be on the parent view else it wont work

    const translateY = interpolate(
      translateScrollX.value,
      inputRange,
      [ height / 2, 0, - height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateScrollX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    )

    return {
      transform:[
        { translateY }
      ],
      opacity
    }
  })

  return (
    <View style={[styles.container, { backgroundColor: `rgba(0,0,256,0.${index + 1})` }]}>
      <StatusBar 
         translucent 
         backgroundColor={'rgba(0,0,256,0.1)'} 
         barStyle={'dark-content'}  
       />

       <Animated.View style={[styles.square, reanimatedContainer]} />
       <Animated.View style={[styles.textLayer, , reanimatedText]}>
          <Text style={styles.text}> { title } </Text>
       </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
      width: SQUARE_SIZE,
      height: SQUARE_SIZE,
      backgroundColor: '#36ac',
  },
  textLayer: {
    position: 'absolute'
  },
  text: {
    fontFamily: 'Gotham',
    color: '#fff',
    fontSize: 50
  }
})

export { Page };