const express = require("express");
const UserController = require("../../contollers/user-controller");

const router = express.Router();

router.post("/singup", UserController.create);
router.post("/singin", UserController.signIn);

module.exports = router;
