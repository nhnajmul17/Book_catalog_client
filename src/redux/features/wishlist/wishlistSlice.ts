import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/bookType";

interface IWishList {
  wishList: IBook[];
}

const initialState: IWishList = {
  wishList: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
  },
});
export const { setWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
