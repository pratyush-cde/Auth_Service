const { AppErrors } = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class ValidationError extends AppErrors {
  constructor(error) {
    let errorName = error.name;
    let explanation = [];

    error.errors.forEach((err) => {
      explanation.push(err.message);
    });

    super(errorName, "Validation failed", explanation, StatusCodes.BAD_REQUEST);
  }
}

module.exports = {
  ValidationError,
};
