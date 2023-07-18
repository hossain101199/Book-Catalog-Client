import { Outlet } from "react-router-dom";
import Container from "./components/atoms/Container";
import Navbar from "./components/molecules/Navbar";
import { useAppDispatch, useAppSelector } from "./redux/hookx";
import { accessToken } from "./utils/localStorage";
import { useEffect } from "react";
import { setCredentials } from "./redux/features/auth/authSlice";

const App = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken && !token) {
      dispatch(setCredentials(accessToken));
    }
  }, [token, dispatch]);
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default App;
