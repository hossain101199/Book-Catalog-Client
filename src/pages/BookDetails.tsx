import { useGetSingleBookQuery } from "../redux/features/book/booksApi";
import bookImage from "../assets/images/book.jpg";

import Spinner from "../components/atoms/Spinner";
import { IBook } from "../types/globalTypes";
import BookReviews from "../components/molecules/BookReviews";
import { useParams } from "react-router-dom";
import AddWishlist from "../components/atoms/AddWishlist";

const BookDetails: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleBookQuery(id!);

  const bookData = data?.data as IBook;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <AddWishlist />
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
                <span className="font-semibold">Publication Year :</span>{" "}
                {bookData.publicationYear}
              </p>
            </div>
          </div>
          <BookReviews />
        </div>
      )}
    </>
  );
};

export default BookDetails;
