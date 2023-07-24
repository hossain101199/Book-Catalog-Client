import { useGetReviewsQuery } from "../../redux/features/review/reviewsApi";
import { useParams } from "react-router-dom";
import PostReview from "../atoms/PostReview";
import Spinner from "../atoms/Spinner";
import { useAppSelector } from "../../redux/hookx";

const BookReviews = () => {
  const { id } = useParams();
  const { token } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetReviewsQuery(id!, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div>
      {token && <PostReview />}

      {isLoading ? (
        <Spinner />
      ) : (
        data?.data.map((review) => (
          <p
            key={review.id}
            className="text-lg font-normal text-secondary mt-5"
          >
            <span className="font-semibold">{review?.user?.name} : </span>
            {review?.comment}
          </p>
        ))
      )}
    </div>
  );
};

export default BookReviews;
