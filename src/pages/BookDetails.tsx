import { useGetSingleBookQuery } from "../redux/features/book/booksApi";
import bookImage from "../assets/images/book.jpg";
import formatDate from "../utils/formatDate";
import Spinner from "../components/atoms/Spinner";
import { IBook } from "../types/globalTypes";
import { useAppSelector } from "../redux/hookx";
import BookReviews from "../components/molecules/BookReviews";
import { useParams } from "react-router-dom";

const BookDetails: React.FC = () => {
  const { id } = useParams();

  const { token } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetSingleBookQuery(id!);

  const bookData: IBook = data?.data;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="rounded-xl overflow-hidden grid md:grid-cols-2 items-center w-fit shadow-lg">
            <img src={bookImage} className="w-full" alt="book image" />
            <div className="px-8 py-6 flex flex-col gap-3">
              <h3 className="text-[28px] font-bold text-secondary">
                {bookData.title}
              </h3>
              <p className="text-lg font-normal text-secondary">
                <span className="font-semibold">Author :</span>{" "}
                {bookData.author}
              </p>
              <p className="text-lg font-normal text-secondary">
                <span className="font-semibold">Genre :</span> {bookData.genre}
              </p>
              <p className="text-lg font-normal text-secondary">
                <span className="font-semibold">Publication Date :</span>{" "}
                {formatDate(bookData.publicationDate)}
              </p>
            </div>
          </div>
          {token && <BookReviews />}
        </div>
      )}
    </>
  );
};

export default BookDetails;
