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

module.exports = validateUser;
