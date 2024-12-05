import { useState, useEffect } from "react";
import { images } from "../data/images";
import data from "../data/destinations.json"; // Menggunakan data destinasi dari file JSON

const Budget = () => {
  const [balance, setBalance] = useState(0); // Saldo awal
  const [amount, setAmount] = useState(""); // Input untuk menambah saldo
  const [recommendations, setRecommendations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null); // Destinasi yang dipilih

  const [livingCost, setLivingCost] = useState(0);
  const [transportCost, setTransportCost] = useState(0);
  const [accommodationCost, setAccommodationCost] = useState(0);

  useEffect(() => {
    const loadDestinations = () => {
      const selectedIds = [1, 2, 5, 4];
      const loadedData = data
        .filter((item) => selectedIds.includes(item.id))
        .map((item) => ({
          ...item,
          image: images[item.image], // Menggunakan jalur gambar dari images.js
        }));
      setRecommendations(loadedData);
    };
    loadDestinations();
  }, []);

  const handleAddBalance = () => {
    const addedAmount = parseFloat(amount);
    if (!isNaN(addedAmount) && addedAmount > 0) {
      setBalance(balance + addedAmount);
      setAmount("");
    }
  };

  const handleDestinationChange = (event) => {
    const destinationId = parseInt(event.target.value);
    const destination = recommendations.find(
      (item) => item.id === destinationId
    );
    setSelectedDestination(destination);
  };

  const handleAddExpense = (expense, setExpense) => {
    if (balance >= expense) {
      setBalance(balance - expense);
      setExpense(expense);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-100 space-y-4">
      {/* Main Content */}
      <main className="flex-1 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          Hai Budi, this is your Budget
        </h1>

        {/* Your Balance Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Your Balance</h2>
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
          </div>
          <div className="mt-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Add amount"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleAddBalance}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Balance
            </button>
          </div>
        </section>

        {/* Destination Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Destination</h2>
          <select
            onChange={handleDestinationChange}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select a destination</option>
            {recommendations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.title}
              </option>
            ))}
          </select>
          {selectedDestination && (
            <div className="flex items-center bg-gray-100 p-4 rounded-lg">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.title}
                className="w-24 h-24 rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">
                  {selectedDestination.title}
                </h3>
                <p className="text-gray-600">{selectedDestination.location}</p>
                <p className="text-yellow-500">
                  ⭐ {selectedDestination.rating}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Travel Budget Estimate Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Travel Budget Estimate</h2>
          <div className="flex items-center justify-around bg-gray-100 p-4 rounded-lg">
            <div className="w-1/3 text-center">
              <h3 className="text-lg font-bold">${livingCost.toFixed(2)}</h3>
              <p className="text-gray-600">Biaya Hidup</p>
              <input
                type="number"
                placeholder="Add amount"
                className="w-full p-2 border rounded mb-2"
                onChange={(e) =>
                  handleAddExpense(parseFloat(e.target.value), setLivingCost)
                }
              />
            </div>
            <div className="w-1/3 text-center">
              <h3 className="text-lg font-bold">${transportCost.toFixed(2)}</h3>
              <p className="text-gray-600">Transportasi</p>
              <input
                type="number"
                placeholder="Add amount"
                className="w-full p-2 border rounded mb-2"
                onChange={(e) =>
                  handleAddExpense(parseFloat(e.target.value), setTransportCost)
                }
              />
            </div>
            <div className="w-1/3 text-center">
              <h3 className="text-lg font-bold">
                ${accommodationCost.toFixed(2)}
              </h3>
              <p className="text-gray-600">Akomodasi Hotel</p>
              <input
                type="number"
                placeholder="Add amount"
                className="w-full p-2 border rounded mb-2"
                onChange={(e) =>
                  handleAddExpense(
                    parseFloat(e.target.value),
                    setAccommodationCost
                  )
                }
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Budget;
