import React, { FC } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

const COLORS = [
    "red", "purple", "blue", "cyan", "green", "yellow", "orange", "black", "white"
]

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';

const { width, height } = Dimensions.get('window');

const ColorPicker: FC = () => {
  return (
    <>
      <View style={styles.topContainer}>
      </View>
      <View style={styles.bottomContainer}>
      </View>
    </>
  )
}

export default ColorPicker;

const styles = StyleSheet.create({
    topContainer: {
        flex: 3,
        backgroundColor: '#c20b0b',
        width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        width
    }
});