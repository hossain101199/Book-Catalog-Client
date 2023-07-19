import { Link } from "react-router-dom";
import BookCard from "../components/atoms/BookCard";
import Spinner from "../components/atoms/Spinner";
import { useGetBooksQuery } from "../redux/features/book/booksApi";
import { IBook } from "../types/globalTypes";

const Home = () => {
  const { data, isLoading, isError } = useGetBooksQuery({});

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
          <div className="flex justify-center mt-12">
            <Link
              to="/books"
              className="border-2 border-primary rounded-lg px-6 py-3 font-bold text-primary"
            >
              More Books
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
