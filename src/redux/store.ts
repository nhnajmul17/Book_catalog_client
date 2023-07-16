import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/books/bookSlice";
import { api } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import wishlistSlice from "./features/wishlist/wishlistSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
    wishlist: wishlistSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
