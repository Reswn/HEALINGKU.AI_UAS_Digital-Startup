import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Destination from "../src/pages/Destination";
import Flanner from "../src/pages/Flanner";
import Budget from "../src/pages/Budget";
import Profile from "../src/pages/Profile";
import ChatBot from "./pages/ChatBot";
import DestinationDetail from "./pages/DestinationDetail";

function App() {
  const location = useLocation(); // Mendapatkan lokasi saat ini
  return (
    <>
      <div className="flex p-2">
        {/* Sidebar hanya ditampilkan di Home */}
        {/* {location.pathname === "/" && <Sidebar />} */}
        <Sidebar />
        <div
          className={`flex-1 bg-gray-100 p-5 ${
            location.pathname === "/" ? "" : "w-full"
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/flanner" element={<Flanner />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route
              path="/destinationDetail/:id"
              element={<DestinationDetail />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
