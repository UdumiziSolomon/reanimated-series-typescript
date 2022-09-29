import React, { FC } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import Counter from './components/Counter';

const { width, height } = Dimensions.get('window');

const SlidingCounter: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Sliding Counter  </Text>
      <Counter />
    </View>
  )
}

export default SlidingCounter

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Gotham',
    position: 'absolute',
    top: 0,
    marginTop: 60,
    fontSize: 25
  }
});