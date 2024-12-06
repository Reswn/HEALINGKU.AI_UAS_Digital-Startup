/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  FaUser,
  FaComments,
  FaRegLightbulb,
  FaMoneyBillWave,
  FaUserCircle,
  FaRegCalendarAlt,
} from "react-icons/fa"; // Ikon
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi toggle sidebar
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  });

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(""); // Clear the username from state
    // Redirect to login page
  };

  return (
    <>
      <div className="flex">
        <div
          className={`${
            isOpen ? "w-64" : "w-20"
          } h-screen bg-white shadow-lg flex flex-col justify-between transition-all duration-300`}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              {isOpen && (
                <img
                  src={logo}
                  alt="Logo Healingku .AI"
                  className="h-12 w-12 object-contain transition-all duration-300"
                />
              )}
              {isOpen && (
                <div className="ml-3 text-blue-500 font-bold text-xl">
                  Healingku .AI
                </div>
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="menu_open">
                    <path
                      id="Vector"
                      d="M4.20374 18H15.2037C15.7537 18 16.2037 17.55 16.2037 17C16.2037 16.45 15.7537 16 15.2037 16H4.20374C3.65374 16 3.20374 16.45 3.20374 17C3.20374 17.55 3.65374 18 4.20374 18ZM4.20374 13H12.2037C12.7537 13 13.2037 12.55 13.2037 12C13.2037 11.45 12.7537 11 12.2037 11H4.20374C3.65374 11 3.20374 11.45 3.20374 12C3.20374 12.55 3.65374 13 4.20374 13ZM3.20374 7C3.20374 7.55 3.65374 8 4.20374 8H15.2037C15.7537 8 16.2037 7.55 16.2037 7C16.2037 6.45 15.7537 6 15.2037 6H4.20374C3.65374 6 3.20374 6.45 3.20374 7ZM20.5037 14.88L17.6237 12L20.5037 9.12C20.8937 8.73 20.8937 8.1 20.5037 7.71C20.1137 7.32 19.4837 7.32 19.0937 7.71L15.5037 11.3C15.1137 11.69 15.1137 12.32 15.5037 12.71L19.0937 16.3C19.4837 16.69 20.1137 16.69 20.5037 16.3C20.8837 15.91 20.8937 15.27 20.5037 14.88Z"
                      fill="#B8BFCC"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="menu_open">
                    <path
                      id="Vector"
                      d="M4.20374 18H15.2037C15.7537 18 16.2037 17.55 16.2037 17C16.2037 16.45 15.7537 16 15.2037 16H4.20374C3.65374 16 3.20374 16.45 3.20374 17C3.20374 17.55 3.65374 18 4.20374 18ZM4.20374 13H12.2037C12.7537 13 13.2037 12.55 13.2037 12C13.2037 11.45 12.7537 11 12.2037 11H4.20374C3.65374 11 3.20374 11.45 3.20374 12C3.20374 12.55 3.65374 13 4.20374 13ZM3.20374 7C3.20374 7.55 3.65374 8 4.20374 8H15.2037C15.7537 8 16.2037 7.55 16.2037 7C16.2037 6.45 15.7537 6 15.2037 6H4.20374C3.65374 6 3.20374 6.45 3.20374 7ZM20.5037 14.88L17.6237 12L20.5037 9.12C20.8937 8.73 20.8937 8.1 20.5037 7.71C20.1137 7.32 19.4837 7.32 19.0937 7.71L15.5037 11.3C15.1137 11.69 15.1137 12.32 15.5037 12.71L19.0937 16.3C19.4837 16.69 20.1137 16.69 20.5037 16.3C20.8837 15.91 20.8937 15.27 20.5037 14.88Z"
                      fill="#B8BFCC"
                    />
                  </g>
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center px-6 py-4 space-x-3">
            <FaUserCircle className="text-blue-500 text-6xl" />
            {isOpen &&
              username && ( // Show only if username exists
                <div>
                  <span className="text-gray-700 font-bold text-lg">
                    {username}
                  </span>{" "}
                  <button
                    onClick={handleLogout}
                    className="text-white bg-red-500 rounded-md p-1 m-1 font-medium"
                  >
                    Log Out
                  </button>
                </div>
              )}
            {isOpen &&
              !username && ( // Show login link if username does not exist
                <div>
                  <Link
                    to="/login"
                    className="text-white bg-blue-500 rounded-md p-1 m-1 font-medium"
                  >
                    Log In
                  </Link>
                </div>
              )}
          </div>

          <div className="flex flex-col space-y-6 mt-8">
            <div
              className={`flex items-center space-x-3 px-6 py-2 hover:bg-blue-50 cursor-pointer ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Link to="/profile">
                <FaUser className="text-blue-500" />
              </Link>
              {isOpen && (
                <span className="text-gray-700">
                  <Link to="/profile">Akun</Link>
                </span>
              )}
            </div>
            <div
              className={`flex items-center space-x-3 px-6 py-2 hover:bg-blue-50 cursor-pointer ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Link to="/chatbot">
                <FaComments className="text-blue-500" />
              </Link>
              {isOpen && (
                <span className="text-gray-700">
                  <Link to="/chatbot">Chat Bot</Link>
                </span>
              )}
            </div>
            <div
              className={`flex items-center space-x-3 px-6 py-2 hover:bg-blue-50 cursor-pointer ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Link to="/destination">
                <FaRegLightbulb className="text-blue-500" />
              </Link>
              {isOpen && (
                <span className="text-gray-700">
                  <Link to="/destination">Destination</Link>
                </span>
              )}
            </div>
            <div
              className={`flex items-center space-x-3 px-6 py-2 hover:bg-blue-50 cursor-pointer ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Link to="/budget">
                <FaMoneyBillWave className="text-blue-500" />
              </Link>
              {isOpen && (
                <span className="text-gray-700">
                  <Link to="/budget">Budget</Link>
                </span>
              )}
            </div>
            <div
              className={`flex items-center space-x-3 px-6 py-2 hover:bg-blue-50 cursor-pointer ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Link to="/flanner">
                <FaRegCalendarAlt className="text-blue-500" />
              </Link>
              {isOpen && (
                <span className="text-gray-700">
                  <Link to="/flanner">Planner</Link>
                </span>
              )}
            </div>
          </div>

          <div className="p-4">
            {isOpen && (
              <p className="text-gray-400 text-sm">© 2024 Healingku .AI</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
