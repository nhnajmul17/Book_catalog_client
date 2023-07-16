import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/bookType";
import { toast } from "react-hot-toast";

interface IWishList {
  wishList: IBook[];
  readingList: IBook[];
}

const initialState: IWishList = {
  wishList: [],
  readingList: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    setReadingList: (state, action) => {
      const existing = state.readingList.find(
        (book) => book._id === action.payload._id
      );
      if (existing) {
        toast.error("Book Already in Reading list");
      } else {
        state.readingList.push(action.payload);
        toast.success("Book Added in Reading list");
      }
    },
    removeItem: (state, action) => {
      const items = state.readingList.filter(
        (book) => book._id !== action.payload
      );
      state.readingList = items;
    },
  },
});
export const { setWishList, setReadingList, removeItem } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
