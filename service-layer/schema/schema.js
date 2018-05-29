const { check } = require("express-validator/check");
const { isValidDate, isArrayOrInt } = require("../helpers/helpers");

exports.companySchema = [
  check("title").isLength({ min: 1, max: 255 }),
  check("name").isLength({ min: 1, max: 255 }),
  check("url").isURL(),
  check("founding_date").custom(isValidDate),
  check("size_of_organization").isInt({ gt: 3 }),
  check("description").isLength({ min: 1 }),
  check("categories").custom(isArrayOrInt),
  check("resourcing").custom(isArrayOrInt),
  check("technologies").custom(isArrayOrInt)
];
