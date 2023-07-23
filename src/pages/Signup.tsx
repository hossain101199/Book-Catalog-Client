import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Container from "../components/atoms/Container";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../redux/features/auth/authApi";
import Spinner from "../components/atoms/Spinner";
import { signUpFormData } from "../types/globalTypes";
import { toast } from "react-hot-toast/headless";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<signUpFormData>({
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

  const [SignUp, { isLoading, error, isSuccess }] = useSignUpMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const result = await SignUp(formData);
    } catch (error) {
      console.error("An error occurred during SignUp:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/sign-in");
    }
  }, [isSuccess, navigate]);

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
          <label className="font-semibold text-[#5A7184]" htmlFor="email">
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
          <label className="font-semibold text-[#5A7184]" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-[1px] border-[#C3CAD9] rounded-lg px-5 py-4 font-semibold text-[#959EAD] outline-none min-w-[300px]"
            placeholder="Enter password"
            required
          />
        </div>
        {error &&
          error.data?.errorMessages.map((errorMessage) => (
            <p key={errorMessage.message} className="text-red-500">
              {errorMessage.message}
            </p>
          ))}
        <button
          type="submit"
          className="bg-primary rounded-lg min-w-[300px] py-4 text-white font-bold text-lg"
          disabled={isLoading}
        >
          {isLoading ? <Spinner spinnerColour="border-white" /> : "Register"}
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
