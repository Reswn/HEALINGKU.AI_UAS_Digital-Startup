import { useState, useEffect } from "react";
import DestinationCard from "../components/DestinationCard";
import { images } from "../data/images";
import data from "../data/destinations.json";
import { Link } from "react-router-dom";

const Destination = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadDestinations = () => {
      const loadedData = data.map((item) => ({
        ...item,
        image: images[item.image],
      }));
      setRecommendations(loadedData);
    };
    loadDestinations();
  }, []);

  // Filter destinasi berdasarkan kata kunci pencarian
  const filteredRecommendations = recommendations.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6">
          Back
        </button>
      </Link>
      <h2 className="text-2xl font-bold mb-6 text-center">Destinations</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title..."
        className="border p-2 rounded mb-6 w-full"
      />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRecommendations.map((item) => (
          <DestinationCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            location={item.location}
            one={item.one}
            two={item.two}
          />
        ))}
      </div>
    </div>
  );
};

export default Destination;
