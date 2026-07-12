const express = require("express");

const app = express();
const port = 5000;

const todoRoutes = require("./Routes/todos.route");
const userRoutes = require("./Routes/users.route");

app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Listening successfully on port ${port}`);
});
