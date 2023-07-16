/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/bookType";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  setGenreFilter,
  setSearchQuery,
  setYearFilter,
} from "../redux/features/books/bookSlice";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const { data } = useGetBooksQuery(undefined);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const dispatch = useAppDispatch();
  const { searchQuery, genreFilter, yearFilter } = useAppSelector(
    (state) => state.books
  );

  const handleGenreFilter = (e: any) => {
    dispatch(setGenreFilter(e.target.value));
  };
  const handleYearFilter = (e: any) => {
    dispatch(setYearFilter(e.target.value));
  };

  const handleSearch = (e: any) => {
    dispatch(setSearchQuery(e.target.value));
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = data?.filter((book: IBook) => {
      const { title, author, genre, publicationDate } = book;
      const titleMatch = title.toLowerCase().includes(query);
      const authorMatch = author.toLowerCase().includes(query);
      const genreSearch = genre.toLowerCase().includes(query);
      const genreMatch =
        genreFilter === "" || genre.toLowerCase() === genreFilter.toLowerCase();
      const yearMatch =
        yearFilter === "" ||
        publicationDate.toLowerCase().includes(yearFilter.toLowerCase());

      return (
        (titleMatch || authorMatch || genreSearch) && genreMatch && yearMatch
      );
    });
    if (filtered?.length) {
      setFilteredBooks(filtered);
    } else {
      toast("No Search Result Found ", {
        id: "SearchMsg",
      });
    }
  }, [data, searchQuery, genreFilter, yearFilter]);

  const genreOptions = ["All Genres"];
  const yearOptions: string[] = ["All Years"];
  data?.map((book: IBook) => {
    if (!genreOptions.includes(book.genre)) {
      genreOptions.push(book?.genre);
    }
    if (!yearOptions.includes(book.publicationDate.split("-")[0])) {
      yearOptions.push(book.publicationDate.split("-")[0]);
    }
  });

  return (
    <>
      <div className="flex flex-row justify-center items-center mt-4">
        <input
          type="text"
          className="input border-gray-500 w-1/4 mx-2"
          placeholder="Search with title, author, or genre"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          className="input border-gray-500 mx-2"
          value={genreFilter}
          onChange={handleGenreFilter}
        >
          {genreOptions.map((option) => {
            return option === "All Genres" ? (
              <option value="">All Genres</option>
            ) : (
              <option value={option}>{option}</option>
            );
          })}
        </select>
        <select
          className="input border-gray-500 mx-2"
          value={yearFilter}
          onChange={handleYearFilter}
        >
          {yearOptions
            .sort()
            .reverse()
            .map((option) => {
              return option === "All Years" ? (
                <option value="">All Years</option>
              ) : (
                <option value={option}>{option}</option>
              );
            })}
        </select>
        {/* {user.email && (
          <div className="">
            <Link to="/wishlist">
              <button className="py-2 px-4 mx-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Wish List
              </button>
            </Link>

            <Link to="/readinglist">
              <button className="py-2 mx-2 px-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Reading List
              </button>
            </Link>
          </div>
        )} */}
      </div>

      <Link to="/addbook">
        <button className="fixed bottom-10 right-10 z-20 btn bg-blue-300">
          Add New
        </button>
      </Link>

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
