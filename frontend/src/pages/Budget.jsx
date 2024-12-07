import { useState, useEffect } from "react";
import { images } from "../data/images";
import data from "../data/destinations.json"; // Using destination data from a JSON file

const Budget = () => {
  const [balance, setBalance] = useState(0); // Initial balance
  const [amount, setAmount] = useState(""); // Input for adding balance
  const [recommendations, setRecommendations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null); // Selected destination
  const [username, setUsername] = useState("");

  const [livingCost, setLivingCost] = useState(0);
  const [transportCost, setTransportCost] = useState(0);
  const [accommodationCost, setAccommodationCost] = useState(0);

  const userId = 1; // Replace with the actual user ID from your system

  useEffect(() => {
    const loadDestinations = () => {
      const selectedIds = [1, 2, 5, 4, 3, 7];
      const loadedData = data
        .filter((item) => selectedIds.includes(item.id))
        .map((item) => ({
          ...item,
          image: images[item.image], // Using image path from images.js
        }));
      setRecommendations(loadedData);
    };

    const fetchBudget = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/budgets/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setBalance(data.balance);
          } else {
            console.error("No budget data available");
          }
        } else if (response.status === 404) {
          console.error("Budget not found");
          setBalance(0); // Set initial balance to 0 if not found
        } else {
          console.error("Error fetching budget:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };

    loadDestinations();
    fetchBudget();

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [userId]);

  const handleAddBalance = async () => {
    const addedAmount = parseFloat(amount);
    if (!isNaN(addedAmount) && addedAmount > 0) {
      const newBalance = balance + addedAmount;
      setBalance(newBalance);
      setAmount("");
      try {
        const response = await fetch("http://localhost:3000/api/budgets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            balance: newBalance,
          }),
        });
        if (!response.ok) {
          console.error("Error adding balance:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding balance:", error);
      }
    } else {
      console.error("Invalid amount");
    }
  };

  const handleDestinationChange = (event) => {
    const destinationId = parseInt(event.target.value);
    const destination = recommendations.find(
      (item) => item.id === destinationId
    );
    setSelectedDestination(destination);
  };

  const handleAddExpense = async (expense, setExpense, category) => {
    if (balance >= expense) {
      const newBalance = balance - expense;
      setBalance(newBalance);
      setExpense(expense);
      try {
        const response = await fetch("http://localhost:3000/api/expenses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            budget_id: userId,
            category,
            amount: expense,
          }),
        });
        if (!response.ok) {
          console.error("Error adding expense:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    } else {
      console.error("Insufficient balance");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8 bg-blue-200 space-y-4">
      {/* Main Content */}
      <main className="flex-1 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          Hi {username}, kira-kira berapa pengeluaran anggaran kamu?
        </h1>

        {/* Your Balance Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Saldo Anda Selama Liburan</h2>
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-bold">Rp. {balance.toFixed(2)}</p>
          </div>
          <div className="mt-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Tambah Jumlah"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleAddBalance}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Masukan Saldo
            </button>
          </div>
        </section>

        {/* Destination Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Destinasi Selama Liburan</h2>
          <select
            onChange={handleDestinationChange}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Pilih Destinasi</option>
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
          <h2 className="text-xl font-bold mb-2">
            Estimasi Pengeluaran Liburan
          </h2>
          <div className="flex items-center justify-around bg-gray-100 p-4 rounded-lg">
            <div className="w-1/3 text-center">
              <h3 className="text-lg font-bold">Rp. {livingCost.toFixed(2)}</h3>
              <p className="text-gray-600">Biaya Hidup</p>
              <input
                type="number"
                placeholder="Tambah Jumlah"
                className="w-full p-2 border rounded mb-2"
                onChange={(e) =>
                  handleAddExpense(
                    parseFloat(e.target.value),
                    setLivingCost,
                    "Living Cost"
                  )
                }
              />
            </div>
            <div className="w-1/3 text-center">
              <h3 className="text-lg font-bold">
                Rp. {transportCost.toFixed(2)}
              </h3>
              <p className="text-gray-600">Transportasi</p>
              <input
                type="number"
                placeholder="Tambah Jumlah"
                className="w-full p-2 border rounded mb-2"
                onChange={(e) =>
                  handleAddExpense(
                    parseFloat(e.target.value),
                    setTransportCost,
                    "Transport"
                  )
                }
              />
            </div>
            <div className="w-1/3 text-center">
              <h3 className="text-lg font-bold">
                Rp. {accommodationCost.toFixed(2)}
              </h3>
              <p className="text-gray-600">Akomodasi</p>
              <input
                type="number"
                placeholder="Tambah Jumlah"
                className="w-full p-2 border rounded mb-2"
                onChange={(e) =>
                  handleAddExpense(
                    parseFloat(e.target.value),
                    setAccommodationCost,
                    "Accommodation"
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
