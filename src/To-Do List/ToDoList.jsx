import { useState, useEffect } from "react";
import "./ToDoList.css";

function ToDo() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  function addTask() {
    if (!text.trim()) return;

    const newTask = {
      text: text.trim(),
      status: "Ongoing",
      showStatusControls: false,
    };

    setTasks([...tasks, newTask]);
    setText("");
  };

  function removeTask(index) {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  function toggleStatusControls(index) {
    setTasks((t) =>
      t.map((task, i) =>
        i === index
          ? { ...task, showStatusControls: !task.showStatusControls }
          : { ...task, showStatusControls: false }
      )
    );
  };

  function changeStatus(index, newStatus) {
    setTasks((t) =>
      t.map((task, i) =>
        i === index ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="todo_wrapper">
      <h1 className="todo_header">To-Do List</h1>

      <div className="input_container">
        <input
          type="text"
          className="taskInput"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          autoComplete="off"
        />

        <button className="addTaskBtn" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="taskList">
        {tasks.map((task, index) => (
          <div key={index} className="task-item-container">
            <li
              className={task.status}
              onClick={(e) => {
                if (e.target.tagName.toLowerCase() === "button") return;
                toggleStatusControls(index);
              }}
            >
              {task.text}

              <button
                className="remove-btn"
                onClick={() => removeTask(index)}
              >
                ❌
              </button>
            </li>

            {task.showStatusControls && (
              <div className="status-controls" style={{ display: "flex" }}>
                {["Inactive", "Completed", "Ongoing"].map((status) => (
                  <label key={status}>
                    <input
                      type="radio"
                      name={`status_${index}`}
                      value={status}
                      checked={task.status === status}
                      onChange={() => changeStatus(index, status)}
                    />
                    {status}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
