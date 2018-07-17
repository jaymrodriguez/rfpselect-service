const { STATUS_CODES } = require('../helpers/enums');
const { validationResult } = require('express-validator/check');
/*
 * Middleware that runs validations. Returns error message if there's any or
 * calls next middleware to handle response
*/
exports.runValidations = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({ errors: validationErrors.array() });
  }

  next();
};
