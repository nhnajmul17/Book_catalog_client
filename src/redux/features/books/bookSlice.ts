import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/bookType";
import { toast } from "react-hot-toast";

interface IBookstate {
  books: IBook[];
  searchQuery: string;
  genreFilter: string;
  wishList: IBook[];
}

const initialState: IBookstate = {
  books: [],
  searchQuery: "",
  genreFilter: "",
  wishList: [],
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
    setWishList: (state, action: PayloadAction<IBook>) => {
      const existing = state.wishList.find(
        (book) => book._id === action.payload._id
      );

      if (existing) {
        toast.error("Book Already in Wishlist");
      } else {
        state.wishList.push(action.payload);
        toast.success("Book Added in Wishlist");
      }
    },
  },
});
export const { setBooks, setSearchQuery, setGenreFilter, setWishList } =
  bookSlice.actions;
export default bookSlice.reducer;
