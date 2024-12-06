/* eslint-disable react-hooks/exhaustive-deps */
import DestinationCard from "../components/DestinationCard";
import rekomendasi from "../assets/images/rekomendasi.png";
import chatBot from "../assets/images/chatbot.png";
import budget from "../assets/images/budget.png";
import pemeran from "../assets/images/pemeran.png";
import map from "../assets/images/map.png";
import { useState, useEffect } from "react";
import { images } from "../data/images";
import data from "../data/destinations.json";

const Home = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadDestinations = () => {
      const selectedIds = [1, 2, 5, 4];
      const loadedData = data
        .filter((item) => selectedIds.includes(item.id))
        .map((item) => ({
          ...item,
          image: images[item.image],
        }));
      setRecommendations(loadedData);
    };

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    loadDestinations();
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4 rounded-md">
        <h1 className="text-2xl font-bold">Welcome, {username}</h1>
      </header>
      <main className="flex-grow bg-gray-50 p-4 lg:p-8">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="col-span-1 lg:col-span-2 bg-blue-100 p-4 lg:p-6 rounded-lg shadow-md flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-lg lg:text-xl font-extrabold text-yellow-500">
                Best Destinations around the world
              </h2>
              <h1 className="text-2xl lg:text-4xl font-bold">
                Travel, enjoy and live a new and full life
              </h1>
              <p className="font-light">
                Rencanakan liburan otomatis sesuai budget! Atur destinasi,
                anggaran, dan itinerary dengan mudah. Mulai perjalanan tanpa
                ribet.
              </p>
            </div>
            <img
              src={pemeran}
              alt="Plan your destination"
              className="w-full lg:w-1/2 rounded-lg"
            />
          </div>
          <div className="col-span-1 bg-blue-500 p-4 lg:p-6 rounded-lg shadow-md flex items-center justify-center">
            <img src={map} alt="Map" className="w-full" />
          </div>
          <div className="col-span-1">
            <h2 className="text-lg font-bold mb-4 text-center">
              Recommendation Destination
            </h2>
            <div className="space-y-4">
              {recommendations.map((item) => (
                <DestinationCard
                  key={item.id}
                  id={item.id} // Mengirimkan ID ke DestinationCard
                  image={item.image}
                  title={item.title}
                  location={item.location}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">
            We Offer Best Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4">
            <div className="p-4 shadow rounded-lg text-center">
              <img src={rekomendasi} className="mx-auto mb-4 w-12 h-12" />
              <h3 className="font-bold text-sm">My Recommendation</h3>
              <p className="text-gray-600 text-xs">
                Membantu pengguna menyusun, memantau, dan menyesuaikan anggaran
                perjalanan mereka.
              </p>
            </div>
            <div className="p-4 shadow rounded-lg text-center">
              <img src={chatBot} className="mx-auto mb-4 w-12 h-12" />
              <h3 className="font-bold text-sm">Chat Bot</h3>
              <p className="text-gray-600 text-xs">
                Membantu pengguna mendapatkan panduan secara real-time melalui
                percakapan otomatis.
              </p>
            </div>
            <div className="p-4 shadow rounded-lg text-center">
              <img src={budget} className="mx-auto mb-4 w-12 h-12" />
              <h3 className="font-bold text-sm">Budget</h3>
              <p className="text-gray-600 text-xs">
                Memberikan saran destinasi dan aktivitas sesuai anggaran dan
                minat pengguna.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
