import { ChangeEvent, FormEvent, useState } from "react";
import Container from "../components/atoms/Container";
import { Link } from "react-router-dom";
interface FormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <Container className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-secondary mb-7">Sign Up</h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[#5A7184]" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none min-w-[300px]"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[#5A7184]" htmlFor="name">
            Email address
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none min-w-[300px]"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[#5A7184]" htmlFor="name">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none min-w-[300px]"
            placeholder="Enter name"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary rounded-lg min-w-[300px] py-4 text-white font-bold text-lg"
        >
          Register
        </button>

        <p className="text-sm font-semibold text-[#959EAD]">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-bold text-primary">
            Sign In
          </Link>
        </p>
      </form>
    </Container>
  );
};

export default Signup;
