const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      message: "Successfully created a new user",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not able to create a new user",
      success: false,
      data: {},
      err: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      data: response,
      message: "Successfully signed in",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false,
      data: {},
      err: error,
    });
  }
};
module.exports = {
  create,
  signIn,
};
