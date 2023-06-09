import { createSlice } from "@reduxjs/toolkit";

const getImageSlice = createSlice({
  name: "image",
  initialState: [],
  reducers: {
    getDefaultImage(state, action) {
        return action.payload
    },
  },
});

export default getImageSlice.reducer;

export const { getDefaultImage } = getImageSlice.actions;
