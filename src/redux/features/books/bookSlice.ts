import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/bookType";

interface IBookstate {
  books: IBook[];
  searchQuery: string;
  genreFilter: string;
  yearFilter: string;
}

const initialState: IBookstate = {
  books: [],
  searchQuery: "",
  genreFilter: "",
  yearFilter: "",
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
    setYearFilter: (state, action) => {
      state.yearFilter = action.payload;
    },
  },
});
export const { setBooks, setSearchQuery, setGenreFilter, setYearFilter } =
  bookSlice.actions;
export default bookSlice.reducer;
