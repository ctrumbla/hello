import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import TaskPage from "./components/TaskPage";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedTask, setSelectedTask] = useState(null);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      {!selectedTask ? (
        <Dashboard tasks={tasks} setTasks={saveTasks} onSelect={setSelectedTask} />
      ) : (
        <TaskPage task={selectedTask} tasks={tasks} setTasks={saveTasks} onBack={() => setSelectedTask(null)} />
      )}
    </div>
  );
}