import {FlatList, StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import TextViewBase from '../../../../components/TextViewBase';
import {selectFilterTodos, useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import { TTodo, updateTodo } from '../../../../redux/todos/todosSlice';
import { fetchUpdateTodo } from '../../../../redux/todos/action';
export const switchColor = (type: string) => {
  switch (type) {
    case 'High':
      return '220, 0, 24';
    case 'Medium':
      return '0, 139, 248';
    case 'Low':
      return '245, 183, 0';
    default:
      return '0, 139, 248';
  }
};
const ItemTodo = (props: {item: any; itemChangedTodo?: (item: any) => void}) => {
  const {item, itemChangedTodo} = props;
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <CheckBox
        // disabled={false}
        value={item.completed}
        onValueChange={(val)=>{itemChangedTodo && itemChangedTodo({...item, completed: val})}}
        style={{width: 20, height: 20}}
      />
      <TextViewBase
        title={item.name ?? 'underfind'}
        containerStyles={{flex: 1, paddingHorizontal: 15}}
      />
      <View
        style={{
          backgroundColor: `rgba(${switchColor(item.prority)},0.2)`,
          borderColor: `rgba(${switchColor(item.prority)},1)`,
          borderWidth: 1,
        }}>
        <TextViewBase
          title={item.prority}
          containerStyles={{flex: 1, paddingHorizontal: 15, paddingVertical: 5}}
        />
      </View>
    </View>
  );
};

const ViewListTodo = () => {
  const todos = useAppSelector(selectFilterTodos);
  const dispatch = useAppDispatch()
  const itemChangedTodo = async (todo:TTodo) =>{
    try {
      const response = await dispatch(fetchUpdateTodo(todo))
      console.log("handle call update todo ", response)
    } catch (error) {
      console.log("error handle call update todo ", error)
    }
  }
  const renderItem = ({item}: {item: any}) => {
    return <ItemTodo item={item} itemChangedTodo={itemChangedTodo}/>;
  };
  return (
    <View style={{flex: 1, marginVertical: 15}}>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 1,}}
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index + JSON.stringify(item)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{width: '100%', alignItems: 'center'}}>
            <View
              style={{
                height: 0.5,
                width: '80%',
                alignItems: 'center',
                backgroundColor: 'gray',
                marginVertical: 8,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ViewListTodo;

const styles = StyleSheet.create({});


