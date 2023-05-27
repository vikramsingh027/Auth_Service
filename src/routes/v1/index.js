const express = require("express");

const UserController = require("../../controllers/user-controller");
const {
  validateUser,
  validateIsAdminRequest,
} = require("../../middlewares/user-middleware");

const router = express.Router();

router.post("/signup", validateUser, UserController.create);
router.post("/signin", validateUser, UserController.signIn);
router.get("/isAuthenticated", UserController.isAuthenticated);
router.get("/isAdmin", validateIsAdminRequest, UserController.isAdmin);

module.exports = router;
