import { useState, useEffect } from "react";
import { images } from "../data/images";
import data from "../data/destinations.json";
import DestinationCard from "../components/DestinationCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Flanner = () => {
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Low",
    due: null,
  });

  const [newGoal, setNewGoal] = useState({ title: "", progress: 0 });

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
    loadDestinations();
  }, []);

  // Functions for tasks
  const handleAddTask = () => {
    if (newTask.title.trim() !== "" && newTask.due) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({ title: "", priority: "Low", due: null });
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Functions for goals
  const handleAddGoal = () => {
    if (
      newGoal.title.trim() !== "" &&
      newGoal.progress >= 0 &&
      newGoal.progress <= 100
    ) {
      setGoals([...goals, { ...newGoal, id: goals.length + 1 }]);
      setNewGoal({ title: "", progress: 0 });
    }
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
  };

  const handleUpdateGoal = (id, updatedGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
  };

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-100 space-y-4">
      {/* Greeting and Buttons */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Hello Budi, How can I help you today?
        </h1>
        <div className="space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            + Ask AI
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Get tasks update
          </button>
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Get tasks workspace
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {/* My Tasks */}
          <section>
            <h2 className="text-xl font-bold mb-4">My Tasks</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">IN PROGRESS</h3>
                {tasks.length === 0 ? (
                  <p className="text-gray-500">No tasks in progress.</p>
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
                          {" "}
                          Priority: {task.priority} - Due:{" "}
                          {task.due ? task.due.toDateString() : "No due date"}{" "}
                        </p>{" "}
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
                )}
              </div>
              <div>
                <h3 className="font-bold mb-2">Add Task</h3>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-bold">To Do</h4>
                  <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="block w-full p-2 mb-2 border rounded"
                  />
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="block w-full p-2 mb-2 border rounded"
                  >
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                  </select>
                  <DatePicker
                    selected={newTask.due}
                    onChange={(date) => setNewTask({ ...newTask, due: date })}
                    className="block w-full p-2 mb-2 border rounded"
                    placeholderText="Select due date"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddTask}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* My Goals */}
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4">My Goals</h2>
            <div className="space-y-4">
              {goals.length === 0 ? (
                <p className="text-gray-500">No goals set.</p>
              ) : (
                goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold mb-2">{goal.title}</h4>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-blue-500 h-4 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() =>
                          handleUpdateGoal(goal.id, {
                            ...goal,
                            progress: goal.progress + 10,
                          })
                        }
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
              <div>
                <h3 className="font-bold mb-2">Add Goal</h3>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-bold">New Goal</h4>
                  <input
                    type="text"
                    placeholder="Goal title"
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    className="block w-full p-2 mb-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Progress (%)"
                    value={newGoal.progress}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, progress: e.target.value })
                    }
                    className="block w-full p-2 mb-2 border rounded"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddGoal}
                  >
                    Add Goal
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-full md:w-1/4 bg-gray-200 rounded-lg shadow-md p-4">
          <h2 className="text-center font-bold mb-4">Calendar</h2>
          <div className="p-4 rounded-lg shadow mb-4 flex justify-center items-center">
            <DatePicker
              inline
              selected={newTask.due}
              onChange={(date) => setNewTask({ ...newTask, due: date })}
              className="absolute left-2"
            />
          </div>
          <h2 className="text-center font-bold mb-4">
            Your History Destination
          </h2>
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
