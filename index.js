const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const connectDB = require("./Config/db");
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
const port = 5000;

const todoRoutes = require("./Routes/todos.route");
const userRoutes = require("./Routes/users.route");



app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Listening successfully on port ${port}`);
});
