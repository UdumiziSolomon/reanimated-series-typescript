import React, { FC, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Dimensions, StatusBar, Text } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

const LIST_ITEM_COLOR = '#1798de';

interface Item {
  id: number;
}


const { width, height } = Dimensions.get('window');

const LayoutAnimation: FC = () => {

  // new Array(5).fill(0).map((_, index) => ({ id: index }))

  const [items, setItems] = useState<Item[]>([]);

    //  add layouts
  const addLayout = useCallback(() => {
    setItems( currentItems => {

      const nextID = (currentItems[currentItems.length - 1]?.id ?? 0) + 1
      return [...currentItems, { id: nextID }];
    });

  } , []);

  // delete layouts
  const onDelete = useCallback((itemsId: number) => {
    setItems(currentItems => (
      currentItems.filter(item => item.id != itemsId)
    ))
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Layout Animation  </Text>
      <TouchableOpacity style={styles.touch} onPress={addLayout}>
        <Text style={{ color: '#fff', fontFamily: 'Circular', fontSize: 35 }}> + </Text>
      </TouchableOpacity>
     <ScrollView style={{ flex: 1, backgroundColor: '#fff', width, height }}>
      { items.map(item => (
        <Animated.View 
          key={item.id} 
          style={styles.listItem}
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout.delay(50)}
          onTouchEnd={() => onDelete(item.id)}
        />
      ))}
     </ScrollView>
    </View>
  )
}

export default LayoutAnimation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    width
  },
  listItem: {
    height: 80,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: LIST_ITEM_COLOR,
    margin: 10,
    borderRadius: 20,
    // shadow for ANDROID
    elevation: 5,
    // Shadow for IOS
    shadowOffset: {
        width: 0,
        height: 20
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  touch: {
    width: 70,
    aspectRatio: 1,
    position: 'absolute',
    backgroundColor: '#000',
    bottom: 40,
    right: '5%',
    zIndex: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Gotham',
    marginTop: 5,
    fontSize: 25,
    color: '#111',
    textAlign: 'center'
  }
})