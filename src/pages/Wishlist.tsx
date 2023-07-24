import { Key } from "react";
import Spinner from "../components/atoms/Spinner";
import { useGetWishlistQuery } from "../redux/features/wishlist/wishlistApi";
import { useAppSelector } from "../redux/hookx";

const Wishlist = () => {
  const { token } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetWishlistQuery(token);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Book Name</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map(
              (
                book: {
                  id: Key | null | undefined;
                  book: { title: string };
                  status: string;
                },
                index: number
              ) => (
                <tr key={book.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{book?.book?.title}</td>
                  <td className="border px-4 py-2">{book.status}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Wishlist;
