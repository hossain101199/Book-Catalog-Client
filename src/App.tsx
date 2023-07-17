import { Outlet } from "react-router-dom";
import Container from "./components/atoms/Container";
import Navbar from "./components/molecules/Navbar";

const App = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default App;
