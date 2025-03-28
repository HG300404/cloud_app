import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const gameSlide = createSlice({
  name: "game",
  initialState,
  reducers: {
    searchGame: (state, action) => {
      state.search = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchGame } = gameSlide.actions;

export const gameReducer = gameSlide.reducer;
