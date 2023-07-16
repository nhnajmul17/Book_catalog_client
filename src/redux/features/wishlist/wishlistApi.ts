import { api } from "../../api/apiSlice";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishList: builder.query({
      query: (email) => ({
        url: `/wishList/${email}`,
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),

    addwishlist: builder.mutation({
      query: (data) => ({
        url: `/wishList/addwishlist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    removeWishList: builder.mutation({
      query: (id) => ({
        url: `/wishList/removeWishList/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useGetWishListQuery,
  useAddwishlistMutation,
  useRemoveWishListMutation,
} = wishlistApi;
