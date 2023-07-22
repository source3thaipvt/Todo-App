import { createAsyncThunk } from '@reduxjs/toolkit';
import { TTodo, addTodo } from './todosSlice';
import { RootState } from '../store';

const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (payload, {getState, requestId}) => {
        let result
        const {todos}:RootState = getState()
        if (requestId !== todos.currentRequestId || todos.status !=='pending') {
            return
        }
        await fetch('api/todos').then(res => result = res.json()).then(res => result = res.todos)
        return result
    }
)
const fetchAddTodo = createAsyncThunk(
    'todos/fetchAddTodo',
    async (payload:TTodo, {dispatch, getState, requestId}) => {
        let result
        const {todos}:RootState = getState()
        if (requestId !== todos.currentRequestId || todos.status !=='pending') {
            return
        }
        await fetch('api/todos',
            { method: 'POST', body: JSON.stringify(payload) })
            .then(res => {
               result = res.json()
            })
        return result
    }
)
const fetchUpdateTodo = createAsyncThunk(
    'todos/fetchUpdateTodo',
    async (payload:TTodo, {dispatch, getState, requestId}) => {
        let result
        const {todos}:RootState = getState()
        if (requestId !== todos.currentRequestId || todos.status !=='pending') {
            return
        }
        await fetch('api/updateTodo',
            { method: 'POST', body: JSON.stringify(payload) })
            .then(res =>result = res.json())
            .catch(err=>{console.log(err)})
        return result
    }
)
export {
    fetchTodos,
    fetchAddTodo,
    fetchUpdateTodo
}