const validateUser = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      data: {},
      message: "Mandatory fields are missing",
      success: false,
      error: "Email or password missing in request",
    });
  }
  next();
};

const validateIsAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      success: false,
      data: {},
      err: "user-Id is missing",
      message: "Something went wrong",
    });
  }
  next();
};

module.exports = {
  validateUser,
  validateIsAdminRequest,
};
