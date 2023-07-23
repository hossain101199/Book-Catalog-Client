import { useState } from "react";
import { ICreateBook } from "../types/globalTypes";
import { useCreatedBookMutation } from "../redux/features/book/booksApi";
import { useAppSelector } from "../redux/hookx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBook: React.FC = () => {
  const [formData, setFormData] = useState<ICreateBook>({
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { token } = useAppSelector((state) => state.auth);
  const [mutate, { isLoading, error }] = useCreatedBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const data = {
      token: token!,
      data: formData,
    };

    const result = await mutate(data);
    if (result) {
      toast.success("Successfully created!");
      setFormData({
        title: "",
        author: "",
        genre: "",
        publicationYear: "",
      });
      navigate(`/books/${result.data.data.id}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[#5A7184]" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none w-full"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[#5A7184]" htmlFor="author">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none w-full"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[#5A7184]" htmlFor="genre">
            Genre:
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none w-full"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="font-semibold text-[#5A7184]"
            htmlFor="publicationYear"
          >
            Publication Year:
          </label>
          <input
            type="text"
            id="publicationYear"
            name="publicationYear"
            value={formData.publicationYear}
            className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none w-full"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary rounded-lg min-w-[300px] py-4 text-white font-bold text-lg"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Book"}
        </button>
        {error && <p className="text-red-500">Error: {error?.data.message}</p>}
      </form>
    </div>
  );
};

export default CreateBook;
