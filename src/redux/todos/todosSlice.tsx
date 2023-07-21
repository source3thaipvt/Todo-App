import {createSlice} from '@reduxjs/toolkit';
export interface TTodo {
  id: number | string | number[];
  name: string;
  prority: 'Medium' | 'High' | 'Low';
  completed: boolean;
}
const initialState: TTodo[] = [
  {
    id: 1,
    name: 'TypeScript',
    prority: 'High',
    completed: true,
  },
  {
    id: 2,
    name: 'Redux Tool-kit',
    prority: 'Medium',
    completed: false,
  },
  {
    id: 3,
    name: 'React Native',
    prority: 'Low',
    completed: true,
  },
];

const authSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) =>{
        state.push(action.payload)
    },
    updateTodo: (state, action) =>{
        let indexTodo = state.findIndex((todo)=>todo.id == action.payload.id);
        if (indexTodo !== -1) {
          state[indexTodo] = action.payload
        }
    },
    removeTodo: (state, action) =>{
        state.filter((todo)=> todo.id !== action.payload)
    },
    resetTodo: () => initialState,
  },
});

export const {resetTodo, addTodo, updateTodo, removeTodo} = authSlice.actions;

export default authSlice.reducer;
