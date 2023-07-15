/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/bookType";
import { toast } from "react-hot-toast";

const AllBooks = () => {
  const { data } = useGetBooksQuery(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const query = searchQuery.toLowerCase();
    const filtered = data?.filter((book: IBook) => {
      const { title, author, genre } = book;
      return (
        title.toLowerCase().includes(query) ||
        author.toLowerCase().includes(query) ||
        genre.toLowerCase().includes(query)
      );
    });
    if (filtered.length) {
      setFilteredBooks(filtered);
    } else {
      toast("No Search Result Found ");
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center mt-4">
        <input
          type="text"
          className="input border-gray-500 w-1/4 mx-2"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="btn bg-blue-100" onClick={handleSearchClick}>
          search
        </button>
      </div>
      {filteredBooks?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredBooks?.map((book: IBook) => (
            <BookCard key={book._id} book={book}></BookCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {data?.map((book: IBook) => (
            <BookCard key={book._id} book={book}></BookCard>
          ))}
        </div>
      )}
    </>
  );
};

export default AllBooks;
