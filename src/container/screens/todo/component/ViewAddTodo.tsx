import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputBase from '../../../../components/InputBase';
import uuid from 'react-native-uuid';
import {TTodo, addTodo} from '../../../../redux/todos/todosSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import {renderBadgeItem} from './ViewFilterTodo';
import TouchButton from '../../../../components/TouchButton';
import TextViewBase from '../../../../components/TextViewBase';
import {switchColor} from './ViewListTodo';
import {useAppDispatch} from '../../../../redux/hooks';

const initTodo: TTodo = {
  id: uuid.v4(),
  name: '',
  prority: 'Medium',
  completed: false,
};

const ViewAddTodo = () => {
  const [todo, setTodo] = useState(initTodo);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<'Medium' | 'High' | 'Low'>('Medium');
  const [items, setItems] = useState([
    {label: 'High', value: 'High'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Low', value: 'Low'},
  ]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTodo({...todo, prority: value});
  }, [value]);
  const onChangeText = (text: string) => {
    setTodo({...todo, name: text});
  };
  const handleSumbit = () => {
    if (todo.name.trim().length > 0) {
      dispatch(addTodo(todo));
      setTodo({...initTodo, id: uuid.v4()});
    }
  };
  return (
    <View
      style={{marginBottom: 20, alignItems: 'center', flexDirection: 'row'}}>
      <InputBase
        onChangeText={onChangeText}
        boxStyles={{height: 50, borderRadius: 0, borderRightWidth: 0}}
        containerStyles={{flex: 1}}
        textInputProps={{
          value: todo.name,
        }}
      />
      <DropDownPicker
        containerStyle={styles.dropdown}
        style={{
          borderRadius: 0,
          backgroundColor: `rgba(${switchColor(value)}, 0.2)`,
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        disableBorderRadius={false}
        renderBadgeItem={renderBadgeItem}
        placeholderStyle={{color: 'gray'}}
        onClose={() => {
          setOpen(false);
        }}
      />
      <TouchButton style={styles.btn_add} onPress={handleSumbit}>
        <TextViewBase
          title="ADD"
          textStyles={{color: 'white', fontWeight: '700'}}
        />
      </TouchButton>
    </View>
  );
};

export default ViewAddTodo;

const styles = StyleSheet.create({
  dropdown: {
    width: 120,
    height: 50,
    borderRadius: 0,
  },
  btn_add: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
