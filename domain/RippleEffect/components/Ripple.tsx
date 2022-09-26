import React, { FC } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';

interface RippleProps {
    style? : StyleProp<ViewStyle>;
    onTap?: () => void;
}

const Ripple: FC<RippleProps> = ({ style, onTap, children }) => {
  return (
    <TapGestureHandler>
        <View style={style}>{children}</View>
    </TapGestureHandler>
  )
}

export default Ripple;

const styles = StyleSheet.create({

})