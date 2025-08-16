import React, { useState } from "react";

export default function Dashboard({ tasks, setTasks, onSelect }) {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const addTask = () => {
    if (!title) return;
    const newTask = {
      id: Date.now(),
      title,
      status: "unassigned",
      updates: [],
    };
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const filtered = tasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask} className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </div>
      <input
        className="border p-2 rounded w-full mb-4"
        placeholder="Search tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="space-y-2">
        {filtered.map((task) => (
          <li
            key={task.id}
            className="p-3 bg-white rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(task)}
          >
            <div className="font-semibold">{task.title}</div>
            <div className="text-sm text-gray-600">Status: {task.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}