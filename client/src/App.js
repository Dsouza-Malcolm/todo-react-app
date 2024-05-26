import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import axios from "axios";

import TodoLists from "./components/TodoLists";
import CreateTodo from "./components/CreateTodo";
import NavBar from "./components/NavBar";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    console.log(todos);
    console.log(taskId);
  }, [todos, taskId]);

  const fetchTaskById = async (taskId) => {
    if (taskId === "") {
      setTaskId(null);
      fetchTodos();
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/tasks/${taskId}`
        );
        setTaskId(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
        alert("Failed to fetch task. Please try again later.");
      }
    }
  };

  const addTodo = function (task) {
    axios
      .post("http://localhost:5000/task", { task })
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  const taskComplete = async (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, task: { ...todo.task, status: "completed" } }
          : todo
      )
    );

    setTimeout(async () => {
      try {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.task.status !== "completed")
        );
        await axios.delete(`http://localhost:5000/task/${id}`);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }, 2000);
  };

  const deleteTodo = async function (id) {
    try {
      setTaskId("");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      await axios.delete(`http://localhost:5000/task/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTodo = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/task/${id}`, {
        task: updatedTask,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, task: updatedTask } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      alert("Failed to fetch todos. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container m-auto">
      <NavBar
        fetchTaskById={fetchTaskById}
        taskIds={todos.map((todo) => todo.id)}
      />
      <section className="py-10">
        <div className="grid grid-cols-4 gap-4">
          {taskId
            ? [taskId].map((todo) => {
                return (
                  <TodoLists
                    key={todo.id}
                    id={todo.id}
                    todo={todo.task}
                    taskComplete={taskComplete}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                  />
                );
              })
            : todos.map((todo) => {
                return (
                  <TodoLists
                    key={todo.id}
                    id={todo.id}
                    todo={todo.task}
                    taskComplete={taskComplete}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                  />
                );
              })}
          {taskId ? "" : <CreateTodo addTodo={addTodo} />}
        </div>
      </section>
    </div>
  );
}

export default App;
