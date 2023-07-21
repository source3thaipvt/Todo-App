import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import InputBase from '../../../components/InputBase';
import images from '../../../res/images';
import TextViewBase from '../../../components/TextViewBase';
import TouchButton from '../../../components/TouchButton';
import ViewFilterTodo from './component/ViewFilterTodo';
import ViewListTodo from './component/ViewListTodo';
import ViewAddTodo from './component/ViewAddTodo';

const Todo = () => {
  return (
    <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 20}}>
      <TextViewBase
        title="Todo App with Redux"
        textStyles={{
          paddingBottom: 20,
          fontSize: 24,
          textAlign: 'center',
          fontWeight: '700',
        }}
      />
      <ViewFilterTodo />
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'gray',
          marginTop: 20,
        }}
      />
      <ViewListTodo />
      <ViewAddTodo />
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({});
