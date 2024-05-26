import { useState } from "react";
import axios from "axios";

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      alert("Failed to fetch todos. Please try again later.");
    }
  };

  const addTodo = async (task) => {
    try {
      const response = await axios.post("http://localhost:5000/task", { task });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo. Please try again later.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      await axios.delete(`http://localhost:5000/task/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete todo. Please try again later.");
    }
  };

  const taskComplete = async (id) => {
    // setTodos((prevTodos) =>
    //   prevTodos.map((todo) =>
    //     todo.id === id
    //       ? { ...todo, task: { ...todo.task, status: "completed" } }
    //       : todo
    //   )
    // );

    await axios.put(`http://localhost:5000/task/${id}`, {
      newStatus: "Completed",
    });

    setTimeout(async () => {
      deleteTodo(id);
    }, 2000);
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
      alert("Failed to update todo. Please try again later.");
    }
  };

  return {
    todos,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    taskComplete,
  };
};

export default useTodos;
