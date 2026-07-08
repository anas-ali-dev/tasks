const express = require("express");
const fs = require("fs");
const app = express();
const port = 5000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening sucessfully on port ${port}`);
});

app.delete("/todos/:id", (req, res) => {
  let { id } = req.params;
  let todos = JSON.parse(fs.readFileSync("todos.json", { encoding: "utf8" }));
  let index = todos.findIndex((todo) => todo.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ message: "Todo isn't found!" });
  }

  todos.splice(index, 1);
  fs.writeFileSync("todos.json", JSON.stringify(todos));
  res.sendStatus(200);
});

app.get("/todos/:id", (req, res) => {
  let { id } = req.params;
  let todos = JSON.parse(fs.readFileSync("todos.json", { encoding: "utf8" }));
  let todo = todos.find((todo) => todo.id === Number(id));
  if (!todo) {
    return res.status(404).json({ message: "Todo isn't found" });
  }
  res.status(200).json(todo);
});

app.post("/todos", (req, res) => {
  let todos = JSON.parse(fs.readFileSync("todos.json", { encoding: "utf8" }));
  let nextId = 1;
  if (todos.length > 0) {
    nextId = todos[todos.length - 1].id + 1;
  }

  let todo = { id: nextId, entry: req.body.entry };
  todos.push(todo);
  fs.writeFileSync("todos.json", JSON.stringify(todos));
  res.status(201).json({
    message: "Todo added successfully",
    data: todo,
  });
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  let todos = JSON.parse(fs.readFileSync("todos.json", { encoding: "utf8" }));
  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (req.body.entry !== undefined) {
    todo.entry = req.body.entry;
  }

  fs.writeFileSync("todos.json", JSON.stringify(todos));

  res.status(200).json({ message: "Todo updated sucessfully", data: todo });
});

app.get("/todos", (req, res) => {
  let todos = JSON.parse(fs.readFileSync("todos.json", { encoding: "utf8" }));
  let { limit, skip } = req.query;

  limit = Number(limit);
  skip = Number(skip);

  if (isNaN(limit)) {
    limit = todos.length;
  }
  if (isNaN(skip)) {
    skip = 0;
  }

  let result = todos.slice(skip, skip + limit);

  res.status(200).json({
    message: "Sucessfull",
    total: todos.length,
    count: result.length,
    data: result,
  });
});
