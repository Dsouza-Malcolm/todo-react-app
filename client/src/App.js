import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import axios from "axios";

import TodoLists from "./components/TodoLists";
import CreateTodo from "./components/CreateTodo";
import NavBar from "./components/NavBar";

function App() {
  const [todos, setTodos] = useState([]);

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

  useEffect(() => {
    console.log(todos);
  }, [todos]);

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

  const updateTodo = function (id, updatedTask) {
    axios
      .put(`http://localhost:5000/task/${id}`, { task: updatedTask })
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            return todo.id === id ? { ...todo, task: updatedTask } : todo;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  // editTodo={editTodo}
  return (
    <div className="container m-auto">
      <NavBar />
      <section className="py-10">
        <div className="grid grid-cols-4 gap-4">
          {todos.map((todo) => {
            return (
              <TodoLists
                key={todo.id}
                id={todo.id}
                todo={todo.task}
                taskComplete={taskComplete}
                updateTodo={updateTodo}
              />
            );
          })}
          <CreateTodo addTodo={addTodo} />
          {/* <CreateTodo addTodo={addTodo} />
          <CreateTodo addTodo={addTodo} />
          <CreateTodo addTodo={addTodo} />
          <CreateTodo addTodo={addTodo} /> */}
        </div>
      </section>
    </div>
  );
}

export default App;
