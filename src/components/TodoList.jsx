import React from "react";
import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isDisabled, setDisabled] = useState(true);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, indx) => indx != index);
    setTasks(updatedTasks);
  }

  function disableButton() {
    if (tasks.length > 0) {
      setDisabled(false);
    }
  }
  function deleteAllTasks() {
    if (tasks.length === 0) {
      alert("no tasks to delete");
    }
    setTasks([]);
  }

  function moveTaskUp(index) {
    const updatedTasks = [...tasks];
    if (index > 0) {
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  function moveTaskDown(index) {
    const updatedTasks = [...tasks];
    if (index < tasks.length - 1) {
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-do-list</h1>
      <input
        type="text"
        placeholder="Enter Todos.."
        value={newTask}
        onChange={handleInputChange}
      />
      <button className="add-task" onClick={addTask}>
        Add
      </button>
      <ul style={{ listStyle: "none" }}>
        {tasks.map((currentElement, index) => (
          <li key={index}>
            <span className="text">{currentElement}</span>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button
              className="move-up-button"
              onClick={() => moveTaskUp(index)}
            >
              Up
            </button>
            <button
              className="move-down-button"
              onClick={() => moveTaskDown(index)}
            >
              Down
            </button>
          </li>
        ))}
      </ul>
      <button className="delete-all" onClick={deleteAllTasks}>
        Delete All
      </button>
    </div>
  );
}
