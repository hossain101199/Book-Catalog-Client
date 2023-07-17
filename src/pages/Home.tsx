import { useGetBooksQuery } from "../redux/features/book/booksApi";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useGetBooksQuery(undefined);
  console.log(data);
  return <div>Home</div>;
};

export default Home;
