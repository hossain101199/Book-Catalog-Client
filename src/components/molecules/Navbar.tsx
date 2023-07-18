import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-6">
      <Link to="/">logo</Link>
      <div className="flex gap-11 items-center">
        <ul className="flex gap-11">
          <li className="font-semibold text-secondary">
            <Link to="/books">Books</Link>
          </li>
        </ul>
        <Link
          to="/sign-in"
          className="border-2 border-primary rounded-full px-5 py-2 font-bold text-primary"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
