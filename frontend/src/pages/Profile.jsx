import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    birthDate: "",
    phone: "",
    email: "",
    gender: "",
    password: "********",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await axios.get(
          `http://localhost:3000/api/users/${username}`
        );
        setProfile(response.data);
      } catch (error) {
        setError("Failed to fetch profile data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const username = localStorage.getItem("username");
      // mengambil data cadangan dari local storage
      const profileData = {
        name: localStorage.getItem("nameBackup") || profile.name,
        birthDate: localStorage.getItem("birthDateBackup") || profile.birthDate,
        phone: localStorage.getItem("phoneBackup") || profile.phone,
        email: profile.email,
        gender: profile.gender,
      };

      // melakukan update
      await axios.put(
        `http://localhost:3000/api/users/${username}`,
        profileData
      );
      alert("Profile updated successfully!");

      // menyimpan cadangan baru di local storage
      localStorage.setItem("nameBackup", profileData.name);
      localStorage.setItem("birthDateBackup", profileData.birthDate);
      localStorage.setItem("phoneBackup", profileData.phone);
    } catch (error) {
      setError(alert("Profile updated successfully!"));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="w-full bg-blue-500 h-40 relative flex rounded-md">
        <div className="absolute -bottom-16">
          <div className="relative"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-4xl  bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Pribadi</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Display error message */}
        <form className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Nama:
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Jenis Kelamin:
            </label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Perbaharui
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
