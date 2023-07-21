import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    search: string,
    status: 'All' | 'Completed' | 'Todo',
    priorities: 'Medium' | 'High' | 'Low'[]
} = {
    search: '',
    status: 'All',
    priorities: []
};


const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        searchFilterChanged: (state, action) =>{
            state.search = action.payload
        },
        statusFilterChanged: (state, action) =>{
            state.status = action.payload
        },
        prioritiesFilterChanged: (state, action) =>{
            state.priorities = action.payload
        },
        resetTodo: () => initialState
    },
});

export const { resetTodo, searchFilterChanged, statusFilterChanged, prioritiesFilterChanged } = filtersSlice.actions;

export default filtersSlice.reducer;