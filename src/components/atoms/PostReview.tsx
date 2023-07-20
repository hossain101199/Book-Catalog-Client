import { usePostCommentMutation } from "../../redux/features/review/reviewsApi";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import Spinner from "./Spinner";
import { useAppSelector } from "../../redux/hookx";

const PostReview = () => {
  const { id } = useParams();
  const { token } = useAppSelector((state) => state.auth);
  const [mutate, { isLoading, error, isSuccess }] = usePostCommentMutation();

  const [reviewText, setReviewText] = useState<string>("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const data = {
      token: token!,
      data: { book: id!, comment: reviewText },
    };
    await mutate(data);
    setReviewText("");
  };

  return (
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
          {isLoading ? <Spinner spinnerColour="border-white" /> : "Send"}
        </button>
      </form>
      {error && <p className="text-red-500">Error: {error?.data.message}</p>}
    </div>
  );
};

export default PostReview;
