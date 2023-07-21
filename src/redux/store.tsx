import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/todosSlice";
import filtersSlice from "./filters/filtersSlice";
import baseAppSlice from "./baseApp/baseAppSlice";
import reactotron from "../../ReactotronConfig";

const store = configureStore({
  reducer: {
    baseApp: baseAppSlice,
    todos: todosSlice,
    filters: filtersSlice
  },
  //@ts-ignore
  enhancers: [reactotron.createEnhancer()]
  
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;