import React, { FC, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import { List } from './components/List';
import { ScrollView } from 'react-native-gesture-handler'

const TITLES = [
    'Connect to me on LinkedIn',
    'Follow me on Twitter',
    'Subscribe to my Channel',
    'Connect to me on Github',
    'Buy Reactiive a Coffee',
    'Leave a ☪ ',
    'Subscribe to my Channel',
    'Connect to me on Github',
    'Buy Reactiive a Coffee',
    'Leave a ☪ ',
]

export interface TaskInterface {
    title: string;
    index: number;
}


const BACKGROUND_COLOR = '#fafbff';
const { width } = Dimensions.get('window');

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

const SwipeToDelete: FC = () => {

    const [tasks, setTasks]= useState(TASKS);

    const onDismiss = useCallback((task: TaskInterface) => {
      setTasks((tasks) => tasks.filter(item => item.index != task.index));
    }, []);

    const scrollRef = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.taskText}> TASKS </Text>
      <ScrollView ref={scrollRef} style={{ flex: 1, width }}>
        {tasks.map((task) => (
            <List 
              key={task.index} 
              task={task}
              onDismiss={onDismiss}
              simultaneousHandlers={scrollRef} 
            />
        ))}
      </ScrollView>
    </View>
  )
}

export default SwipeToDelete;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: BACKGROUND_COLOR,
        width,
        paddingTop: StatusBar.currentHeight,
    },
    taskText: {
        fontFamily: 'Gotham',
        fontSize: 30,
        color: '#123456',
        marginHorizontal: 10,
        marginVertical: 20
    }
});