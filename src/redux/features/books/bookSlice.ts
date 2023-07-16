import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  searchQuery: "",
  genreFilter: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setGenreFilter: (state, action) => {
      state.genreFilter = action.payload;
    },
  },
});
export const { setBooks, setSearchQuery, setGenreFilter } = bookSlice.actions;
export default bookSlice.reducer;
