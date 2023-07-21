import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import TextViewBase from '../../../../components/TextViewBase';
import InputBase from '../../../../components/InputBase';
import images from '../../../../res/images';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {prioritiesFilterChanged, searchFilterChanged, statusFilterChanged} from '../../../../redux/filters/filtersSlice';
import {switchColor} from './ViewListTodo';

export const renderBadgeItem = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderWidth: 1,
        paddingHorizontal: 9,
        paddingVertical: 4,
        backgroundColor: `rgba(${switchColor(props.value)}, 0.2)`,
        borderColor: `rgba(${switchColor(props.value)}, 1)`
      }}>
      <TextViewBase title={props.label} />
    </TouchableOpacity>
  );
};

const ViewFilterTodo = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state)=>state.filters)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'High', value: 'High'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Low', value: 'Low'},
  ]);
  
  useEffect(()=>{
    dispatch(prioritiesFilterChanged(value))
  },[value])
  const onSearchChanged = _.debounce((text: any) => {
    dispatch(searchFilterChanged(text));
  }, 500);
  const onToggleStatus = (type: 'All'|'Completed'|'Todo') =>{
    dispatch(statusFilterChanged(type))
  }
  const {search, status, priorities} = filters
  return (
    <View style={{zIndex: 1}}>
      <TextViewBase
        title="Search"
        textStyles={{paddingBottom: 5, fontWeight: '700'}}
      />
      <InputBase onChangeText={onSearchChanged} iconRight={images.ic_search} />
      <TextViewBase
        title="Filter By Status"
        textStyles={{paddingVertical: 5, marginTop: 10, fontWeight: '700'}}
      />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CheckBox
          value={status == 'All'}
          onValueChange={()=>{onToggleStatus('All')}}
          style={{width: 20, height: 20}}
        />
        <TextViewBase title='All' textStyles={{paddingHorizontal: 10, fontWeight: '500'}}/>
        <CheckBox
          value={status == 'Completed'}
          onValueChange={()=>{onToggleStatus('Completed')}}
          style={{width: 20, height: 20}}
        />
        <TextViewBase title='Completed' textStyles={{paddingHorizontal: 10, fontWeight: '500'}}/>
        <CheckBox
          value={status == 'Todo'}
          onValueChange={()=>{onToggleStatus('Todo')}}
          style={{width: 20, height: 20}}
        />
        <TextViewBase title='To do' textStyles={{paddingHorizontal: 10, fontWeight: '500'}}/>
      </View>
      <TextViewBase
        title="Filter By Prority"
        textStyles={{paddingVertical: 5, marginTop: 10, fontWeight: '700'}}
      />
      <DropDownPicker
        style={styles.dropdown}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={true}
        min={0}
        max={5}
        searchable={true}
        mode="BADGE"
        renderBadgeItem={renderBadgeItem}
        placeholderStyle={{color: 'gray'}}
        onClose={() => {
          setOpen(false);
        }}
        badgeSeparatorStyle={{width: 10}}
      />
    </View>
  );
};

export default ViewFilterTodo;

const styles = StyleSheet.create({
  dropdown: {
    // borderColor: '#B7B7B7',
    height: 50,
  },
});
