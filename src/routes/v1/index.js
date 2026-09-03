const express = require("express");
const UserController = require("../../contollers/user-controller");
const { AuthRequestValidators } = require("../../middlewares/index");
const router = express.Router();

router.post(
  "/singup",
  AuthRequestValidators.validateUserAuth,
  UserController.create,
);

router.post(
  "/singin",
  AuthRequestValidators.validateUserAuth,
  UserController.signIn,
);

router.get("/isAuthenticated", UserController.isAuthenticated);

router.get(
  "/isAdmin",
  AuthRequestValidators.validateAdminRequest,
  UserController.isAdmin,
);

module.exports = router;
