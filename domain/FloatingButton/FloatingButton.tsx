import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const FloatingInput = ({ label, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text
        style={[styles.label, { top: isFocused || value ? 0 : 24 }]}
      >
        {label}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};


const FloatingButton = () => {
  const [text, setText] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FloatingInput
        label="Username"
        value={text}
        onChangeText={(value: string) => setText(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: 10,
  },
  label: {
    position: 'absolute',
    left: 8,
    fontSize: 18,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    fontSize: 18,
    paddingLeft: 8,
    height: 50,
    width: 200,
  },
});

export default FloatingButton;

