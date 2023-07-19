import { useState } from "react";
import BookCard from "../components/atoms/BookCard";
import Spinner from "../components/atoms/Spinner";
import { useGetBooksQuery } from "../redux/features/book/booksApi";
import { IBook } from "../types/globalTypes";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");

  const { data, isLoading, isError } = useGetBooksQuery({
    searchTerm,
    genre,
    publicationYear,
  });
  console.log(publicationYear);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { search } = event.target;
    setSearchTerm(search.value);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { filter } = event.target;
    setGenre(filter.value);
  };

  const handlePublicationYear = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { publicationYear } = event.target;
    setPublicationYear(publicationYear.value);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {isError && (
        <p className="text-red-500">Error occurred while fetching data.</p>
      )}
      {!isLoading && (
        <>
          <form className="flex" onSubmit={handleSearch}>
            <input
              id="search"
              name="search"
              required
              className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none"
              placeholder="Search books..."
            />
            <button
              type="submit"
              className="bg-primary rounded-lg py-2 px-9 w-fit text-white font-bold text-lg"
            >
              {isLoading ? <Spinner spinnerColour="border-white" /> : "Search"}
            </button>
          </form>

          <form className="flex" onSubmit={handleFilter}>
            {/* Genre input */}
            <input
              id="filter"
              name="filter"
              required
              className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none"
              placeholder="Filter by genre..."
            />
            <button
              type="submit"
              className="bg-primary rounded-lg py-2 px-9 w-fit text-white font-bold text-lg"
            >
              {isLoading ? <Spinner spinnerColour="border-white" /> : "Filter"}
            </button>
          </form>

          <form className="flex" onSubmit={handlePublicationYear}>
            {/* Publication Year input */}
            <input
              id="publicationYear"
              name="publicationYear"
              required
              className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none"
              placeholder="Filter by publication year..."
            />
            <button
              type="submit"
              className="bg-primary rounded-lg py-2 px-9 w-fit text-white font-bold text-lg"
            >
              {isLoading ? <Spinner spinnerColour="border-white" /> : "Filter"}
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-[30px]">
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
