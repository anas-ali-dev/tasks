<<<<<<< HEAD
const Todo = require("../Models/todo.model");

// GET /todos
const getTodos = async (req, res) => {
  try {
    let { limit = 10, skip = 0 } = req.query;

    limit = Number(limit);
    skip = Number(skip);

    const todos = await Todo.find().limit(limit).skip(skip);

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /todos/:id
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// POST /todos
const addTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    res.status(201).json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// PATCH /todos/:id
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE /todos/:id
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTodos,
=======
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
>>>>>>> f16a226d9f17decd1b797663c658bdb48f168e76
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
