import React, { FC } from 'react';
import { StyleSheet, View , Text} from 'react-native';
import Ripple from './components/Ripple';

const RippleEffect: FC = () => {

    const onTap = () => {

    }
  return (
    <View style={styles.container}>
        <Ripple 
            style={styles.ripple}
            onTap={onTap}
        >
            <Text> Tap </Text>
        </Ripple>
    </View>
  )
}

export default RippleEffect

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ripple: {
        width: 200,
        height: 200,
        backgroundColor: '#fff',
         // shadow for ANDROID
         elevation: 2,
         // Shadow for IOS
         shadowOffset: {
             width: 0,
             height: 20
         },
         shadowOpacity: 0.05,
         shadowRadius: 10,
         alignItems: 'center',
         justifyContent: 'center'
    },
    effect: {

    }
})