const express = require("express");

const UserController = require("../../controllers/user-controller");
const validateUser = require("../../middlewares/user-middleware");

const router = express.Router();

router.post("/signup", validateUser, UserController.create);
router.post("/signin", validateUser, UserController.signIn);
router.get("/isAuthenticated", UserController.isAuthenticated);

module.exports = router;
