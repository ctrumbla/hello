import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const statuses = [
  "unassigned",
  "assigned/in progress",
  "sr awaiting review",
  "sr under review",
  "sr review complete",
  "waiting on oem response",
  "on hold",
  "assigned to plant 6",
  "awaiting review",
  "awaiting customer approval",
  "under review",
  "approved"
];

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

export default function TaskPage({ task, currentUser, onChange }) {
  const [currentStatus, setCurrentStatus] = useState(task.status);
  const [updateHistory, setUpdateHistory] = useState(task.updates || []);
  const [requiredStatuses, setRequiredStatuses] = useState(task.requiredStatuses || []);

  const handleStatusChange = e => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    const newUpdate = { status: newStatus, user: currentUser, date: new Date().toLocaleString() };
    setUpdateHistory([newUpdate, ...updateHistory]);
    onChange({ ...task, status: newStatus, updates: [newUpdate, ...updateHistory], requiredStatuses });
  };

  const addRequiredStatus = status => {
    if (!requiredStatuses.includes(status)) {
      const newList = [...requiredStatuses, status];
      setRequiredStatuses(newList);
      onChange({ ...task, status: currentStatus, updates: updateHistory, requiredStatuses: newList });
    }
  };

  const removeRequiredStatus = index => {
    const newList = requiredStatuses.filter((_, i) => i !== index);
    setRequiredStatuses(newList);
    onChange({ ...task, status: currentStatus, updates: updateHistory, requiredStatuses: newList });
  };

  const onDragEnd = result => {
    if (!result.destination) return;
    const newList = Array.from(requiredStatuses);
    const [moved] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, moved);
    setRequiredStatuses(newList);
    onChange({ ...task, status: currentStatus, updates: updateHistory, requiredStatuses: newList });
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div style={{ flex: 1 }}>
        <h3>{task.title}</h3>
        <label>
          Status:
          <select value={currentStatus} onChange={handleStatusChange}>
            {statuses.map(s => (
              <option key={s} value={s}>{capitalize(s)}</option>
            ))}
          </select>
        </label>
        <h4>Update History</h4>
        <ul>
          {updateHistory.map((u, idx) => (
            <li key={idx}>{u.date} - {u.user} → {capitalize(u.status)}</li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <h4>Required Statuses</h4>
        <select onChange={e => { addRequiredStatus(e.target.value); e.target.value = ""; }}>
          <option value="">-- Add Status --</option>
          {statuses.map(s => (
            <option key={s} value={s}>{capitalize(s)}</option>
          ))}
        </select>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="requiredStatuses">
            {provided => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {requiredStatuses.map((s, i) => (
                  <Draggable key={s} draggableId={s} index={i}>
                    {provided => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {capitalize(s)}
                        <button onClick={() => removeRequiredStatus(i)}>Remove</button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
