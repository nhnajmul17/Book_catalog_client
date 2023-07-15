import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hook";
import { setBooks } from "../redux/features/books/bookSlice";
import { IBook } from "../types/bookType";
import BookCard from "../components/BookCard";

const Home = () => {
  const { data } = useGetBooksQuery(undefined);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBooks(data));
  }, [data, dispatch]);

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
