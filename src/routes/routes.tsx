import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import App from "../App";
import Books from "../pages/Books";

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
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/sign-in",
        element: <Signin />,
      },
    ],
  },
]);

export default router;
