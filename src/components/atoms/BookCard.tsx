import { Link } from "react-router-dom";
import book from "../../assets/images/book.jpg";
import { IBook } from "../../types/globalTypes";
import formatDate from "../../utils/formatDate";

const BookCard = ({ data }: { data: IBook }) => {
  return (
    <div className="rounded-xl overflow-hidden w-fit shadow-lg">
      <img src={book} className="max-h-[255px]" alt="book image" />
      <Link to={`/books/${data.id}`} className="px-8 py-6 flex flex-col gap-3">
        <h3 className="text-[28px] font-bold text-secondary">{data.title}</h3>
        <p className="text-lg font-normal text-secondary">
          <span className="font-semibold">Author :</span> {data.author}
        </p>
        <p className="text-lg font-normal text-secondary">
          <span className="font-semibold">Genre :</span> {data.genre}
        </p>
        <p className="text-lg font-normal text-secondary">
          <span className="font-semibold">Publication year :</span>{" "}
          {formatDate(data.publicationDate)}
        </p>
      </Link>
    </div>
  );
};

export default BookCard;
