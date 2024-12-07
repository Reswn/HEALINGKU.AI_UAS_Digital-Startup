import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import register from "../assets/images/login.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Validasi data di frontend
    if (
      user.fullname.length < 1 ||
      user.username.length < 1 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) ||
      user.password.length < 6
    ) {
      alert("Please provide valid data");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        name: user.fullname,
        username: user.username,
        email: user.email,
        password: user.password,
      });
      console.log("Response:", response);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("There was an error registering!", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side (Image) */}
      <div className="w-1/2 bg-blue-100 flex justify-center items-center">
        <img
          src={register}
          alt="Travel illustration"
          className="w-3/4 rounded-lg"
        />
      </div>

      {/* Right side (Register Form) */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">
          Please Fill out form to Register!
        </h1>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullname"
            >
              Full name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
              placeholder="Full name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="******************"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Yes I have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
