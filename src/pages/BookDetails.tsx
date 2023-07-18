import { Link, useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/booksApi";
import { useGetreviewReviewsQuery } from "../redux/features/review/reviewsApi";
import bookImage from "../assets/images/book.jpg";
import formatDate from "../utils/formatDate";
import Spinner from "../components/atoms/Spinner";
import { IBook } from "../types/globalTypes";
import { useState } from "react";
import { useAppSelector } from "../redux/hookx";

const BookDetails: React.FC = () => {
  const { id } = useParams();

  const { token } = useAppSelector((state) => state.auth);
  const {
    data: book,
    isLoading: bookIsLoading,
    isError: bookIsError,
  } = useGetSingleBookQuery(id!);

  const { data, isLoading, isError } = useGetreviewReviewsQuery(id!);

  const bookData: IBook = book?.data;

  const [reviewText, setReviewText] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Review:", reviewText);

    setReviewText("");
  };

  return (
    <>
      {bookIsLoading ? (
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
          {token && (
            <div className="border-primary border-[1px] rounded-xl p-5 mt-8">
              <form className="flex flex-col items-end" onSubmit={handleSubmit}>
                <textarea
                  id="review"
                  name="review"
                  required
                  className="w-full outline-none font-semibold text-[#959EAD]"
                  placeholder="Leave your comment here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary rounded-lg py-2 px-9 w-fit text-white font-bold text-lg"
                >
                  {isLoading ? (
                    <Spinner spinnerColour="border-white" />
                  ) : (
                    "Send"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BookDetails;
