const express = require("express");
<<<<<<< HEAD
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const connectDB = require("./Config/db");
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
=======

const app = express();
>>>>>>> f16a226d9f17decd1b797663c658bdb48f168e76
const port = 5000;

const todoRoutes = require("./Routes/todos.route");
const userRoutes = require("./Routes/users.route");

<<<<<<< HEAD

=======
app.use(express.json());
>>>>>>> f16a226d9f17decd1b797663c658bdb48f168e76

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Listening successfully on port ${port}`);
});
