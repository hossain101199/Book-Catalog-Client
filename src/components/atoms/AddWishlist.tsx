import React, { useState, ChangeEvent } from "react";
import { useSetWishlistMutation } from "../../redux/features/wishlist/wishlistApi";
import { useAppSelector } from "../../redux/hookx";
import { useParams } from "react-router-dom";

interface WishlistState {
  wishlist: boolean;
  reading: boolean;
  finished: boolean;
}

const AddWishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistState>({
    wishlist: false,
    reading: false,
    finished: false,
  });

  const { id } = useParams();
  const { token } = useAppSelector((state) => state.auth);
  const [mutate, { isLoading, error }] = useSetWishlistMutation();

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    const data = {
      token: token!,
      data: { book: id!, status: name },
    };

    await mutate(data);

    setWishlist((prevWishlist) => ({
      wishlist: name === "wishlist" ? checked : false,
      reading: name === "reading" ? checked : false,
      finished: name === "finished" ? checked : false,
    }));
  };

  return (
    <div>
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
  );
};

export default AddWishlist;
