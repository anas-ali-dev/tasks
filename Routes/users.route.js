const express = require("express");
<<<<<<< HEAD
const router = express.Router();

const { registerUser , getUsers , updateUser , deleteUser} = require("../Controller/user.controller");

router.post("/", registerUser);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

=======

const router = express.Router();

>>>>>>> f16a226d9f17decd1b797663c658bdb48f168e76
module.exports = router;
