import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;
let TODOS = [];
let id = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/task", (req, res) => {
  const task = req.body.task;
  const newTask = {
    id: id++,
    task,
  };

  TODOS.push(newTask);
  console.log(TODOS);

  res.status(201).json(newTask);
});

app.delete("/task/:id", (req, res) => {
  const id = parseInt(req.params.id);
  TODOS = TODOS.filter((todo) => todo.id !== id);
  console.log(TODOS);

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
