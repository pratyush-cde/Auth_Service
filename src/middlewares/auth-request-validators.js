const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went Wrong",
      err: "Email or password is missing",
    });
  }
  next();
};

const validateAdminRequest = (req, res, next) => {
  console.log("body", req.body);
  if (!req.body || !req.body.userId) {
    return res.status(400).json({
      message: "userId is missing in the body",
      dtat: {},
      err: "userId is missing",
      success: false,
    });
  }
  next();
};
module.exports = {
  validateUserAuth,
  validateAdminRequest,
};
