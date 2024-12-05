import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import login from "../assets/images/login.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        localStorage.setItem("username", username); // Store username in local storage
        navigate("/"); // Redirect to the home page
      } else {
        alert("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">Welcome Back!</h1>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Dont have an account? Register
            </Link>
          </div>
        </form>
        <div className="mt-4 flex justify-center space-x-4 cursor-pointer">
          <FaFacebook className="text-blue-600 text-2xl" />
          <FaTwitter className="text-blue-400 text-2xl" />
          <FaWhatsapp className="text-green-500 text-2xl" />
        </div>
      </div>

      <div className="w-1/2 bg-blue-100 flex justify-center items-center">
        <img
          src={login}
          alt="Travel illustration"
          className="w-3/4 rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
