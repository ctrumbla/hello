import React, { useState } from "react";

const statuses = [
  "unassigned",
  "assigned/in progress",
  "SR awaiting review",
  "SR under review",
  "SR review complete",
  "Waiting on OEM response",
  "On hold",
  "Assigned to Plant 6",
  "Awaiting Review",
  "Awaiting Customer Approval",
  "Under review",
  "approved",
];

export default function TaskPage({ task, tasks, setTasks, onBack }) {
  const [note, setNote] = useState("");
  const [user, setUser] = useState("");

  const updateStatus = (status) => {
    const newTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status } : t
    );
    setTasks(newTasks);
  };

  const addUpdate = () => {
    if (!note || !user) return;
    const newUpdate = {
      time: new Date().toLocaleString(),
      user,
      status: task.status,
      note,
    };
    const newTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, updates: [...t.updates, newUpdate] } : t
    );
    setTasks(newTasks);
    setNote("");
  };

  return (
    <div>
      <button onClick={onBack} className="mb-4 text-blue-600">&larr; Back</button>
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <label className="block mb-2">Status</label>
      <select
        value={task.status}
        onChange={(e) => updateStatus(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <div className="mb-4">
        <label className="block mb-2">Add Update</label>
        <input
          className="border p-2 rounded w-full mb-2"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <textarea
          className="border p-2 rounded w-full mb-2"
          placeholder="Update note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={addUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
          Add Update
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-2">Update History</h3>
      <ul className="space-y-2">
        {task.updates.map((u, i) => (
          <li key={i} className="bg-gray-100 p-2 rounded">
            <div className="text-sm text-gray-600">{u.time} by {u.user}</div>
            <div>Status: {u.status}</div>
            <div>{u.note}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}