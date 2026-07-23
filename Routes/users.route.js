const express = require("express");
const router = express.Router();

const { registerUser , getUsers , updateUser , deleteUser} = require("../Controller/user.controller");

router.post("/", registerUser);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
