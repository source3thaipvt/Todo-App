import {useDispatch, useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import type {RootState, AppDispatch} from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectFilterTodos = (state: RootState) => {
  const {todos, filters} = state;
  return todos.filter(todo => {
    if (filters.status == 'All') {
      return filters.priorities.length
        ? todo.name.includes(filters.search) &&
            //@ts-ignore
            filters.priorities.includes(todo.prority)
        : todo.name.includes(filters.search);
    }
    return filters.priorities.length
      ? todo.name.includes(filters.search) &&
          (filters.status == 'Completed' ? todo.completed : !todo.completed) &&
          //@ts-ignore
          filters.priorities.includes(todo.prority)
      : todo.name.includes(filters.search) &&
          (filters.status == 'Completed' ? todo.completed : !todo.completed);
  });
};
