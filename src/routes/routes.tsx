import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import App from "../App";
import Books from "../pages/Books";
import NotFound from "../pages/NotFound";
import BookDetails from "../pages/BookDetails";
import CreateBook from "../pages/CreateBook";
import EditBook from "../pages/EditBook";
import Wishlist from "../pages/Wishlist";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/add-book",
        element: (
          <ProtectedRoute>
            <CreateBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/sign-in",
        element: <Signin />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
