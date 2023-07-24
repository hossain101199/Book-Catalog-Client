import React, { useState, ChangeEvent, useEffect } from "react";
import {
  useGetWishlistByBookIdQuery,
  useSetWishlistMutation,
} from "../../redux/features/wishlist/wishlistApi";
import { useAppSelector } from "../../redux/hookx";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { toast } from "react-hot-toast";

interface WishlistState {
  wishlist: boolean;
  reading: boolean;
  finished: boolean;
}

const AddWishlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAppSelector((state) => state.auth);

  const { data, isLoading: isWishlistLoading } = useGetWishlistByBookIdQuery({
    id: id!,
    token: token!,
  });

  const [wishlist, setWishlist] = useState<WishlistState>({
    wishlist: false,
    reading: false,
    finished: false,
  });

  const [mutate, { isLoading, error }] = useSetWishlistMutation();

  useEffect(() => {
    {
      error && toast.error(error?.data.message);
    }
    if (data?.data) {
      setWishlist({
        wishlist: data.data.status === "wishlist",
        reading: data.data.status === "reading",
        finished: data.data.status === "finished",
      });
    }
  }, [data?.data, error]);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    const requestData = {
      token: token!,
      data: { book: id!, status: name },
    };

    const result = await mutate(requestData);
    if (result) {
      toast.success(result?.data.message);
    }

    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [name]: checked,
    }));
  };

  return (
    <>
      {isLoading || isWishlistLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-center gap-6">
            <label>
              <input
                type="checkbox"
                name="wishlist"
                checked={wishlist.wishlist}
                onChange={handleChange}
              />
              Add to Wishlist
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="reading"
                checked={wishlist.reading}
                onChange={handleChange}
              />
              Mark as Reading
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="finished"
                checked={wishlist.finished}
                onChange={handleChange}
              />
              Mark as Finished
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default AddWishlist;
