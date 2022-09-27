import {GestureHandlerRootView} from 'react-native-gesture-handler'

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, Dimensions } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import { Intro, PanGestureIntro, ScrollViewInterpolate, ThemeSwitch , PinchGesture, SingleAndDoubleTap, PanGestureScroll, ColorPicker, CircularProgressBar, SwipeToDelete, RippleEffect, PerspectiveMenu, SlidingCounter, ClockLoader, LayoutAnimation } from './domain' ;

const { width, height } = Dimensions.get('window');


const App = () => {

  // Handle Splash Configuration
  const isLoadingComplete = useCachedResources();
   //  NB: Set Reanimated Plugin in babel.config.js ==> plugins: ['react-native-reanimated/plugin]

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider style={styles.container}>

        <StatusBar 
          translucent 
          backgroundColor='#fff' 
          barStyle={'dark-content'}  
        />
        <GestureHandlerRootView>
          {/* Independent components */}

          {/* <Intro /> */}
          {/* <PanGestureIntro /> */}
          {/* <ScrollViewInterpolate /> */}
          {/* <ThemeSwitch /> */}
          {/* <PinchGesture /> */}
          {/* <SingleAndDoubleTap /> */}
          {/* <PanGestureScroll /> */}
          {/* <ColorPicker /> */}
          {/* <CircularProgressBar />  */}
          {/* <SwipeToDelete /> */}
          {/* <RippleEffect /> */}
          {/* <PerspectiveMenu /> */}
          {/* <SlidingCounter /> */}
          {/* <ClockLoader /> */}
          {/* <LayoutAnimation /> */}

        </GestureHandlerRootView>

      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height,
    width
  }
})

export default App ;
