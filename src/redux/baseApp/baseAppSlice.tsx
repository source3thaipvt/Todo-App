import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean
} = {
  loading: false
};


const baseApp = createSlice({
  name: "baseApp",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetBaseApp: () => initialState
  },
});

export const { setLoading, resetBaseApp } = baseApp.actions;

export default baseApp.reducer;