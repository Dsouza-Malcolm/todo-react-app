import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;
let id = 3;

let TODOS = [
  {
    id: 1,
    task: {
      title: "Grocery",
      description: "buy milk",
      status: "Pending",
      dueDate: "2024-05-25",
    },
  },
  {
    id: 2,
    task: {
      title: "GYM",
      description: "Exercise Push ups",
      status: "Pending",
      dueDate: "2024-05-25",
    },
  },
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/tasks", (req, res) => {
  res.status(201).json(TODOS);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = TODOS.find((todo) => todo.id === taskId);
  if (task) {
    res.status(201).json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.post("/task", (req, res) => {
  const task = req.body.task;
  const newTask = {
    id: id++,
    task,
  };

  TODOS.push(newTask);

  res.status(201).json(newTask);
});

app.delete("/task/:id", (req, res) => {
  const id = parseInt(req.params.id);
  TODOS = TODOS.filter((todo) => todo.id !== id);

  res.status(200).json({ message: "Completed tasks deleted successfully" });
});

app.put("/task/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = req.body.task;

  TODOS = TODOS.map((todo) =>
    todo.id === id ? { ...todo, task: updatedTask } : todo
  );

  res.status(200).json({ message: "Completed tasks Updated successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
