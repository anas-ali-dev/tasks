const express = require("express");

const router = express.Router();

const {getTodos,getTodo,addTodo,updateTodo,deleteTodo,} = require("../Controller/todo.controller");

router.get("/", getTodos);

router.get("/:id", getTodo);

router.post("/", addTodo);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
