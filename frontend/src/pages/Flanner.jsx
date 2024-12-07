import { useState, useEffect } from "react";
import { images } from "../data/images";
import data from "../data/destinations.json";
import DestinationCard from "../components/DestinationCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Flanner = () => {
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Low",
    due: null,
  });

  const [newGoal, setNewGoal] = useState({ title: "" });
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const loadDestinations = () => {
      const selectedIds = [1, 2];
      const loadedData = data
        .filter((item) => selectedIds.includes(item.id))
        .map((item) => ({ ...item, image: images[item.image] }));
      setRecommendations(loadedData);
    };
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tasks");
        const formattedTasks = response.data.map((task) => ({
          ...task,
          due: task.due_date ? new Date(task.due_date) : null,
        }));
        setTasks(formattedTasks);
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadDestinations();

    const fetchGoals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/goals");
        setGoals(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchTasks();
    fetchGoals();

    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("user_id");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${storedUsername}`
        );
        setUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();
  }, []);
  // Functions for tasks
  const handleAddTask = async () => {
    if (newTask.title.trim() !== "" && newTask.due) {
      try {
        const response = await axios.post("http://localhost:3000/api/tasks", {
          ...newTask,
          due_date: newTask.due.toISOString().split("T")[0],
          user_id: userId,
        });
        setTasks([...tasks, response.data]);
        setNewTask({ title: "", priority: "Low", due: null });
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Functions for goals
  const handleAddGoal = async () => {
    if (newGoal.title.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:3000/api/goals", {
          ...newGoal,
          user_id: userId,
        });
        setGoals([...goals, response.data]);
        setNewGoal({ title: "" });
      } catch (error) {
        console.error("Error adding goal:", error);
      }
    }
  };
  const handleDeleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/goals/${id}`);
      setGoals(goals.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8 bg-blue-100 space-y-4">
      {/* Greeting and Buttons */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Hello {username}, Bagaimana Rencana Liburan Kamu?
        </h1>
        <div className="space-x-4">
          <Link to="/chatbot">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              + Tanya AI
            </button>
          </Link>
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {/* My Tasks */}
          <section>
            {" "}
            <h2 className="text-xl font-bold mb-4">Aktivitas LiburanKu</h2>{" "}
            <div className="space-y-4">
              {" "}
              <div>
                {" "}
                <h3 className="font-bold mb-2">Dalam Rencana</h3>{" "}
                {tasks.length === 0 ? (
                  <p className="text-gray-500">Tidak ada aktivitas</p>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 mb-2 bg-gray-100 rounded-lg flex justify-between items-center"
                    >
                      {" "}
                      <div>
                        {" "}
                        <h4 className="font-bold">{task.title}</h4>{" "}
                        <p
                          className={`text-sm ${
                            task.priority === "High"
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          Priority: {task.priority} - Due:{" "}
                          {task.due_date
                            ? new Date(task.due_date).toLocaleDateString()
                            : "No due date"}
                        </p>
                      </div>{" "}
                      <div className="space-x-2">
                        {" "}
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          {" "}
                          Delete{" "}
                        </button>{" "}
                      </div>{" "}
                    </div>
                  ))
                )}{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="font-bold mb-2">Tambah Aktivitas</h3>{" "}
                <div className="p-4 bg-gray-100 rounded-lg">
                  {" "}
                  <h4 className="font-bold">Aktivitas</h4>{" "}
                  <input
                    type="text"
                    placeholder="nama aktivitas"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="block w-full p-2 mb-2 border rounded"
                  />{" "}
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="block w-full p-2 mb-2 border rounded"
                  >
                    {" "}
                    <option value="Low">Opsional</option>{" "}
                    <option value="High">Prioritas</option>{" "}
                  </select>{" "}
                  <DatePicker
                    selected={newTask.due}
                    onChange={(date) => setNewTask({ ...newTask, due: date })}
                    className="block w-full p-2 mb-2 border rounded"
                    placeholderText="Pilih tanggal"
                  />{" "}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddTask}
                  >
                    {" "}
                    Add Task{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          </section>

          {/* My Goals */}
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4">Tujuan LiburanKu</h2>
            <div className="space-y-4">
              {goals.length === 0 ? (
                <p className="text-gray-500">Belum ada tempat tujuan</p>
              ) : (
                goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold mb-2">{goal.title}</h4>
                      <div className="w-full bg-gray-200 rounded-full h-4"></div>
                    </div>
                    <div className="space-x-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              )}
              <div>
                <h3 className="font-bold mb-2">Tambah Tujuan</h3>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-bold">Tempat Tujuan Baru</h4>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    placeholder="Add new goal"
                    className="border p-2 rounded w-full"
                  />
                  <button
                    onClick={handleAddGoal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2"
                  >
                    Tambah Tujuan
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-full md:w-1/4 bg-blue-300 rounded-lg shadow-md p-4">
          <h2 className="text-center font-bold mb-4">Kalender</h2>
          <div className="p-4 rounded-lg shadow mb-4 flex justify-center items-center">
            <DatePicker
              inline
              selected={newTask.due}
              onChange={(date) => setNewTask({ ...newTask, due: date })}
              className="absolute left-2"
            />
          </div>
          <h2 className="text-center font-bold mb-4">Rekomendasi Destinasi</h2>
          <div className="space-y-2">
            {recommendations.map((item) => (
              <DestinationCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                location={item.location}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Flanner;
