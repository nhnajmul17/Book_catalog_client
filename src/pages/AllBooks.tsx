/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/bookType";
import { toast } from "react-hot-toast";

const AllBooks = () => {
  const { data } = useGetBooksQuery(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");

  const handleGenreFilter = (e: any) => {
    setGenreFilter(e.target.value);
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = data?.filter((book: IBook) => {
      const { title, author, genre } = book;
      const titleMatch = title.toLowerCase().includes(query);
      const authorMatch = author.toLowerCase().includes(query);
      const genreSearch = genre.toLowerCase().includes(query);
      const genreMatch =
        genreFilter === "" || genre.toLowerCase() === genreFilter.toLowerCase();

      return (titleMatch || authorMatch || genreSearch) && genreMatch;
    });
    if (filtered?.length) {
      setFilteredBooks(filtered);
    } else {
      toast("No Search Result Found ");
    }
  }, [data, searchQuery, genreFilter]);

  return (
    <>
      <div className="flex flex-row justify-center items-center mt-4">
        <input
          type="text"
          className="input border-gray-500 w-1/4 mx-2"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          className="input border-gray-500 mx-2"
          value={genreFilter}
          onChange={handleGenreFilter}
        >
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Novel">Novel</option>
          <option value="Fantasy">Fantasy</option>
        </select>
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
