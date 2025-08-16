import React, { useState } from "react";
import TaskPage from "./TaskPage";

const initialTasks = [
  { id: 1, title: "Task 1", status: "unassigned", updates: [], requiredStatuses: [] },
  { id: 2, title: "Task 2", status: "assigned/in progress", updates: [], requiredStatuses: [] }
];

export default function Dashboard({ currentUser }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = useState(initialTasks[0]?.id || null);

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  return (
    <div style={{ display: "flex", padding: "1rem" }}>
      <div style={{ width: "300px", borderRight: "1px solid #ccc", paddingRight: "1rem" }}>
        <h2>Tasks</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <button onClick={() => setSelectedTaskId(task.id)}>
                {task.title} ({task.status})
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, paddingLeft: "1rem" }}>
        {selectedTask ? (
          <TaskPage
            task={selectedTask}
            currentUser={currentUser}
            onChange={updatedTask =>
              setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)))
            }
          />
        ) : (
          <p>Select a task</p>
        )}
      </div>
    </div>
  );
}
