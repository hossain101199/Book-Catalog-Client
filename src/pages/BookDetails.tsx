import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/booksApi";
import bookImage from "../assets/images/book.jpg";
import Spinner from "../components/atoms/Spinner";
import { IBook } from "../types/globalTypes";
import BookReviews from "../components/molecules/BookReviews";
import { useNavigate, useParams } from "react-router-dom";
import AddWishlist from "../components/atoms/AddWishlist";
import { useAppSelector } from "../redux/hookx";
import { useState } from "react";

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { token, email } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetSingleBookQuery(id!);
  const [mutate, { isLoading: isDeleteLoading }] = useDeleteBookMutation();

  const bookData = data?.data as IBook;

  const navigate = useNavigate();

  const toggleConfirmation = () => {
    setShowConfirmation((prev) => !prev);
  };

  const handleDeleteBook = async () => {
    const results = await mutate({ token: token!, id: id! });
    if (results.data) {
      toggleConfirmation();
      navigate(`/books`);
    }
  };

  const handleEditBook = () => {
    navigate(`/edit-book/${id!}`);
  };
  return (
    <>
      {isLoading || isDeleteLoading ? (
        <Spinner />
      ) : (
        <div>
          {email === data?.data.createdBy.email && (
            <div className="flex gap-4 justify-end mb-8">
              <button
                onClick={toggleConfirmation}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
              <button
                onClick={handleEditBook}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            </div>
          )}

          {token && <AddWishlist />}

          <div className="rounded-xl overflow-hidden grid md:grid-cols-2 items-center w-fit shadow-lg mt-8">
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
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="bg-white p-6 rounded-md shadow-md">
                <p className="text-xl font-semibold">
                  Are you sure you want to delete this book?
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={toggleConfirmation}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteBook}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BookDetails;
