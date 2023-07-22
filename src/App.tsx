import { Outlet } from "react-router-dom";
import Container from "./components/atoms/Container";
import Navbar from "./components/molecules/Navbar";
import { useAppDispatch, useAppSelector } from "./redux/hookx";
import { accessToken, userEmail } from "./utils/localStorage";
import { useEffect } from "react";
import { setCredentials } from "./redux/features/auth/authSlice";
import Footer from "./components/molecules/Footer";

const App = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ((accessToken || userEmail) && !token) {
      dispatch(setCredentials({ token: accessToken!, email: userEmail! }));
    }
  }, [token, dispatch]);
  return (
    <Container>
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default App;
