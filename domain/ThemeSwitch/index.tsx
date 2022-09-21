import React, { FC, useState } from 'react';
import { StyleSheet, Switch, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolateColor, useDerivedValue, withSpring } from 'react-native-reanimated';

// color costants
const Colors = {
    dark: {
        background: '#1e1e1e',
        circle: '#252525',
        text: '#f8f8f8'
    },
    light: {
        background: '#f8f8f8',
        circle: '#fff',
        text: '#123456'
    }
};

// type for our theme
type ThemeState = "light" | "dark"

const SWITCH_TRACK_COLOR = {
    true: '#cbc0c018',
    false: '#b8adad'
}

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7

const ThemeSwitch:FC = () => {
    const [theme, setTheme] = useState<ThemeState>("light");

        // use derived value since the value theme value depends on the theme
    const themeValue = useDerivedValue(() => {
        return theme === "dark" ? withSpring(1) : withSpring(0)
    }, [theme])
    
    const reanimatedContainer = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            themeValue.value,
            [0,1],
            [ Colors.light.background, Colors.dark.background ]
        )
        return {
            backgroundColor
        }
    })

    const reanimatedCircle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            themeValue.value,
            [0,1],
            [ Colors.light.circle, Colors.dark.circle ]
        )
        return {
            backgroundColor
        }
    })

    const reanimatedText = useAnimatedStyle(() => {
        const color = interpolateColor(
            themeValue.value,
            [0,1],
            [ Colors.light.text, Colors.dark.text ]
        )
        return {
            color
        }
    })


  return (
    <Animated.View style={[styles.container, reanimatedContainer]}>
        <Animated.Text style={[styles.topText, reanimatedText]}> THEME </Animated.Text>
        <Animated.View style={[styles.circle, reanimatedCircle]}>
            <Switch
                value={theme === "dark" }
                onValueChange={ toggled => {
                    setTheme(toggled ? "dark" : "light")
                }}
                trackColor={SWITCH_TRACK_COLOR}
                thumbColor={'#336699'}
            />
        </Animated.View>
    </Animated.View>
  )
}

export default ThemeSwitch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: CIRCLE_SIZE / 2,
        // shadow for ANDROID
        elevation: 2,
        // Shadow for IOS
        shadowOffset: {
            width: 0,
            height: 20
        },
        shadowOpacity: 0.05,
        shadowRadius: 10
    },
    topText: {
        fontSize: 50,
        fontFamily: 'Gotham',
        marginBottom: 30,
        letterSpacing: 10
    }
})