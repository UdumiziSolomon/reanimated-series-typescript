import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Square from './components/Square';
import { useSharedValue, withTiming, Easing, withRepeat } from 'react-native-reanimated';


const { width } = Dimensions.get('window');

const ClockLoader: FC = () => {

  const progress = useSharedValue<number>(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(4 * Math.PI, { duration: 8000, easing: Easing.linear }), -1);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Clock Loader  </Text>

      {/* new array */}
      {
        new Array(12).fill(0).map((_, index) => (
          <Square
            key={index}
            index={index}
            progress={progress}
          />
        ))
      }
    </View>
  )
}

export default ClockLoader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
    width
  },
  text: {
    fontFamily: 'Gotham',
    position: 'absolute',
    top: 0,
    marginTop: 60,
    fontSize: 25,
    color: '#fff',
  }
})