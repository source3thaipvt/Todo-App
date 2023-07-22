import {createSlice} from '@reduxjs/toolkit';
import { fetchAddTodo, fetchTodos, fetchUpdateTodo } from './action';
export interface TTodo {
  id: number | string | number[];
  name: string;
  prority: 'Medium' | 'High' | 'Low';
  completed: boolean;
}
const initialState:{
  loading: boolean,
  status: string,
  todos: TTodo[],
  msgErr: any,
  currentRequestId: any
} = {
  loading: false,
  status: '',
  todos: [],
  msgErr: null,
  currentRequestId: undefined
};

const authSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      let indexTodo = state.todos.findIndex(todo => todo.id == action.payload.id);
      if (indexTodo !== -1) {
        state.todos[indexTodo] = action.payload;
      }
    },
    removeTodo: (state, action) => {
      state.todos.filter(todo => todo.id !== action.payload);
    },
    resetTodos: (state) => state = initialState,
  },
  extraReducers: builder =>{
    builder
    // get todos
    .addCase(fetchTodos.pending, (state, {payload, meta}) =>{
      state.loading = true
      state.status = 'pending'
      state.currentRequestId = meta.requestId
    })
    .addCase(fetchTodos.fulfilled, (state, {payload, meta})=>{
      state.loading = false,
      state.status = 'finished'
      state.todos = payload
      state.currentRequestId = undefined
    })
    .addCase(fetchTodos.rejected, (state, {payload, meta})=>{
      state.loading = false,
      state.status = 'rejected'
      state.currentRequestId = undefined
    })
    // add todo
    .addCase(fetchAddTodo.pending, (state, {payload, meta}) =>{
      state.loading = true
      state.status = 'pending'
      state.currentRequestId = meta.requestId
    })
    .addCase(fetchAddTodo.fulfilled, (state, {payload, meta})=>{
      state.loading = false,
      state.status = 'finished'
      state.currentRequestId = undefined
    })
    .addCase(fetchAddTodo.rejected, (state, {payload, meta})=>{
      state.loading = false,
      state.status = 'rejected'
      state.currentRequestId = undefined
    })
    // update todo
    .addCase(fetchUpdateTodo.pending, (state, {payload, meta}) =>{
      state.loading = true
      state.status = 'pending'
      state.currentRequestId = meta.requestId
    })
    .addCase(fetchUpdateTodo.fulfilled, (state, {payload, meta})=>{
      state.loading = false,
      state.status = 'finished'
      state.currentRequestId = undefined
    })
    .addCase(fetchUpdateTodo.rejected, (state, {payload, meta})=>{
      state.loading = false,
      state.status = 'rejected'
      state.currentRequestId = undefined
    })
  }
});

export const {resetTodos, addTodo, updateTodo, removeTodo} = authSlice.actions;

export default authSlice.reducer;
