import { useParams, useNavigate } from "react-router-dom";
import { images } from "../data/images";
import data from "../data/destinations.json";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = data.find((item) => item.id === parseInt(id));

  return (
    <div className="p-8 bg-white min-h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      {destination ? (
        <div>
          <img
            src={images[destination.image]}
            alt={destination.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {destination.title}
          </h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">★ 4.9</span>
            <span className="text-gray-700 ml-2">(322 reviews)</span>
          </div>
          <p className="text-gray-700 mb-6">{destination.deskripsi}</p>
          <h2 className="text-2xl font-bold mb-4">Foto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <img
              src={images[destination.one]}
              alt={destination.title}
              className="w-full h-32 object-cover rounded-lg"
            />
            <img
              src={images[destination.two]}
              alt={destination.title}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Apriliani</h3>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">★ 4.9</span>
              <span className="text-gray-700 ml-2">Pengalaman luar biasa!</span>
            </div>
            <p className="text-gray-700">
              Tempat bagus untuk liburan di hari libur dan menyenangkan
              tentunya, saya menyukai tempat ini ❤️❤️
            </p>
          </div>
        </div>
      ) : (
        <p>Destination not found</p>
      )}
    </div>
  );
};

export default DestinationDetail;
``;
