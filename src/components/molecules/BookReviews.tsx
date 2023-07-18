import { useGetreviewReviewsQuery } from "../../redux/features/review/reviewsApi";
import { useParams } from "react-router-dom";
import PostReview from "../atoms/PostReview";
import Spinner from "../atoms/Spinner";

const BookReviews = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetreviewReviewsQuery(id!, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div>
      <PostReview />

      {isLoading ? (
        <Spinner />
      ) : (
        data?.data.map((review) => (
          <p className="text-lg font-normal text-secondary mt-5">
            <span className="font-semibold">{review?.user?.name} : </span>
            {review?.comment}
          </p>
        ))
      )}
    </div>
  );
};

export default BookReviews;
