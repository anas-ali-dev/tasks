const fs = require("fs");

const getTodos = (req, res) => {
  let todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));

  let { limit, skip } = req.query;

  limit = Number(limit);
  skip = Number(skip);

  if (isNaN(limit)) limit = todos.length;
  if (isNaN(skip)) skip = 0;

  let result = todos.slice(skip, skip + limit);

  res.status(200).json({
    message: "Successful",
    total: todos.length,
    count: result.length,
    data: result,
  });
};

const getTodo = (req, res) => {
  let { id } = req.params;

  let todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));

  let todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return res.status(404).json({
      message: "Todo isn't found",
    });
  }

  res.status(200).json(todo);
};

const addTodo = (req, res) => {
  let todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));

  let nextId = 1;

  if (todos.length > 0) {
    nextId = todos[todos.length - 1].id + 1;
  }

  let todo = {
    id: nextId,
    entry: req.body.entry,
  };

  todos.push(todo);

  fs.writeFileSync("todos.json", JSON.stringify(todos));

  res.status(201).json({
    message: "Todo added successfully",
    data: todo,
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;

  let todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));

  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  if (req.body.entry !== undefined) {
    todo.entry = req.body.entry;
  }

  fs.writeFileSync("todos.json", JSON.stringify(todos));

  res.status(200).json({
    message: "Todo updated successfully",
    data: todo,
  });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;

  let todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));

  let index = todos.findIndex((todo) => todo.id === Number(id));

  if (index === -1) {
    return res.status(404).json({
      message: "Todo isn't found!",
    });
  }

  todos.splice(index, 1);

  fs.writeFileSync("todos.json", JSON.stringify(todos));

  res.sendStatus(200);
};

module.exports = { getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
