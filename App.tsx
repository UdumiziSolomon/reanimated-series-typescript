import {GestureHandlerRootView} from 'react-native-gesture-handler'

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import { Intro, PanGestureIntro } from './domain' ;

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
          {/* <Intro /> */}
          {/* <PanGestureIntro /> */}
        </GestureHandlerRootView>


      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App ;
