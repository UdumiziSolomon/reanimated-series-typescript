import React, { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated , { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Page } from './components/Page';

// Text to be displayed on each screen
const PAGE_TEXTS = [
  "HELLO",
  "WORLD",
  "MOBILE",
  "DEVS"
]

const ScrollViewInterpolate: FC = () => {

  const translateScrollX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler( (event) => {
    translateScrollX.value = event.contentOffset.x;
  })

  return (
      <Animated.ScrollView
        onScroll={scrollHandler} 
        // pagingEnabled    ==> enable this if you want an onboarding feature
        horizontal 
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >

          { PAGE_TEXTS.map((dto, index) => (
            <Page 
              key={index.toString()} 
              title={dto} 
              index={index} 
              translateScrollX={translateScrollX}
            />
          ))}

      </Animated.ScrollView>
  )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
})
export default ScrollViewInterpolate;