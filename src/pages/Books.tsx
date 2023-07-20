import React, { useState, FormEvent } from "react";
import BookCard from "../components/atoms/BookCard";
import Spinner from "../components/atoms/Spinner";
import { useGetBooksQuery } from "../redux/features/book/booksApi";
import { IBook } from "../types/globalTypes";

const Books: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [publicationYear, setPublicationYear] = useState<string>("");

  const { data, isLoading, isError } = useGetBooksQuery({
    searchTerm,
    genre,
    publicationYear,
  });

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget.search as HTMLInputElement;
    setSearchTerm(value);
  };

  const handleFilter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget.filter as HTMLInputElement;
    setGenre(value);
  };

  const handlePublicationYear = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget.publicationYear as HTMLInputElement;
    setPublicationYear(value);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {isError && (
        <p className="text-red-500">Error occurred while fetching data.</p>
      )}
      {!isLoading && (
        <>
          <div className="flex justify-between gap-4">
            <form className="flex gap-4" onSubmit={handleSearch}>
              <input
                id="search"
                name="search"
                className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none"
                placeholder="Search books..."
              />
              <button
                type="submit"
                className="bg-primary rounded-lg py-2 px-9 w-fit text-white font-bold text-lg"
              >
                {isLoading ? (
                  <Spinner spinnerColour="border-white" />
                ) : (
                  "Search"
                )}
              </button>
            </form>

            <form className="flex gap-4" onSubmit={handleFilter}>
              {/* Genre input */}
              <input
                id="filter"
                name="filter"
                className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none"
                placeholder="Filter by genre..."
              />
              <button
                type="submit"
                className="bg-primary rounded-lg py-2 px-9 w-fit text-white font-bold text-lg"
              >
                {isLoading ? (
                  <Spinner spinnerColour="border-white" />
                ) : (
                  "Filter"
                )}
              </button>
            </form>

            <form className="flex gap-4" onSubmit={handlePublicationYear}>
              {/* Publication Year input */}
              <input
                id="publicationYear"
                name="publicationYear"
                className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none"
                placeholder="Filter by publication year..."
              />
              <button
                type="submit"
                className="bg-primary rounded-lg py-2 px-9 w-fit text-white font-bold text-lg"
              >
                {isLoading ? (
                  <Spinner spinnerColour="border-white" />
                ) : (
                  "Filter"
                )}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-[30px] mt-[30px]">
            {data?.data?.map((book: IBook) => (
              <BookCard data={book} key={book.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Books;
