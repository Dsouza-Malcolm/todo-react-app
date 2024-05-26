import React, { useState, useEffect } from "react";
import InputBox from "./InputBox";

function CreateTodo({
  addTodo,
  updateTodo,
  existingTask,
  handleSave,
  editing,
}) {
  const [dueDateMin, setDueDateMin] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDueDateMin(formattedDate);
    setStatus("In-Progress");

    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setDueDate(existingTask.dueDate);
    }
  }, [existingTask]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      alert("All fields are required");
      return;
    }

    const newTask = {
      title: title,
      description: description,
      status: status,
      dueDate: dueDate,
    };

    if (existingTask) {
      handleSave(newTask);
    } else {
      addTodo(newTask);
    }

    setDescription("");
    setTitle("");
    setDueDate("");
  }

  return (
    <div className="bg-gray-50 rounded-lg p-5">
      <form action="/tasks" method="post">
        <InputBox
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label={"Title"}
        />
        <InputBox
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label={"Description"}
        />
        <InputBox
          type={"date"}
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
          min={dueDateMin}
          label={"Due Date"}
        />
        <div className="flex justify-end">
          <input
            style={{
              backgroundColor: editing ? "bg-red-400" : "bg-green-500",
            }}
            className={`text-sm font-bold py-1.5 px-4 text-white rounded-md cursor-pointer ${
              editing
                ? "bg-blue-400 hover:bg-blue-500"
                : "hover:bg-red-500 bg-red-400"
            }`}
            type="submit"
            onClick={handleSubmit}
            value={existingTask ? "Update" : "Add"}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateTodo;
