import { StyleSheet, Dimensions } from 'react-native'
import React, { FC } from 'react';
import Animated, { useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

type SquareProps = {
  key: number;
  index: number ;
  progress: Animated.SharedValue<number>
}

const SQUARE_SIZE = 12;
const N = 12 ;


const Square: FC<SquareProps> = ({ index, progress }) => {

  const offsetAngle = ( 2 * Math.PI) / N;
  const finalAngle = offsetAngle * ( N - 1 - index) ;

  const rotate = useDerivedValue(() => {
    if(progress.value <= 2 * Math.PI){
      return Math.min(finalAngle, progress.value);
    }

    if(progress.value - 2 * Math.PI < finalAngle){
      return finalAngle ;
    }
    
    return progress.value ;
    
  }, []);

  const translateY = useDerivedValue(() => {
    if(rotate.value === finalAngle) {
      return withTiming(-N * SQUARE_SIZE) ;
    }

    if(progress.value > 2 * Math.PI){
      return withSpring(( index - N) * SQUARE_SIZE);
    }
    return withTiming(-index * SQUARE_SIZE);
  }, []);


  const reanimatedStyle = useAnimatedStyle(() => {

    return { 
      transform: [
        { rotate: `${rotate.value}rad`},
        { translateY: translateY.value }
      ]
    }
  })

  return (
    <Animated.View style={[styles.square, {
      // opacity: (index + 1) / N
    }, reanimatedStyle]}>
      
    </Animated.View>
  )
}

export default Square

const styles = StyleSheet.create({
  square: {
    backgroundColor: '#fff',
    height: N,
    aspectRatio: 1,
    position: 'absolute',
    borderRadius: N / 2
  }
})