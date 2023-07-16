import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setBooks } from "../redux/features/books/bookSlice";
import { IBook } from "../types/bookType";
import BookCard from "../components/BookCard";
import { useGetWishListQuery } from "../redux/features/wishlist/wishlistApi";
import { setWishList } from "../redux/features/wishlist/wishlistSlice";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetBooksQuery(undefined);
  const { data: wishlistData } = useGetWishListQuery(user?.email);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBooks(data));
    dispatch(setWishList(wishlistData));
  }, [data, dispatch, wishlistData]);

  const bookdata = data?.slice(-10).reverse();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
      {bookdata?.map((book: IBook) => (
        <BookCard key={book._id} book={book}></BookCard>
      ))}
    </div>
  );
};

export default Home;
