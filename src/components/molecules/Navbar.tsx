import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hookx";
import { logOut } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    dispatch(logOut());
  };

  return (
    <nav className="flex justify-between items-center py-6">
      <Link to="/">logo</Link>
      <div className="flex gap-11 items-center">
        <ul className="flex gap-11">
          <li className="font-semibold text-secondary">
            <Link to="/books">Books</Link>
          </li>

          {token && (
            <li className="font-semibold text-secondary">
              <Link to="/add-book">add book</Link>
            </li>
          )}
        </ul>
        {token ? (
          <button
            onClick={handleSignOut}
            className="border-2 border-primary rounded-full px-5 py-2 font-bold text-red-500"
          >
            Sign Out
          </button>
        ) : (
          <Link
            to="/sign-in"
            className="border-2 border-primary rounded-full px-5 py-2 font-bold text-primary"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
