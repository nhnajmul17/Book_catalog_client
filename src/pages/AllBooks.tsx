import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/bookType";

const AllBooks = () => {
  const { data } = useGetBooksQuery(undefined);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data?.map((book: IBook) => (
        <BookCard key={book._id} book={book}></BookCard>
      ))}
    </div>
  );
};

export default AllBooks;
