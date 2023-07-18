import BookCard from "../components/atoms/BookCard";
import Spinner from "../components/atoms/Spinner";
import { useGetBooksQuery } from "../redux/features/book/booksApi";
import { IBook } from "../types/globalTypes";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery();
  return (
    <>
      {isLoading && <Spinner />}
      {isError && <p>Error occurred while fetching data.</p>}
      {!isLoading && (
        <>
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
