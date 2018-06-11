const { check } = require("express-validator/check");
const {
  isValidDate,
  isArrayOrInt,
  companyExists,
  companyHasHQ
} = require("../helpers/helpers");

exports.companySchema = [
  check("title")
    .isLength({ min: 1, max: 255 })
    .escape()
    .trim(),
  check("name")
    .isLength({ min: 1, max: 255 })
    .escape()
    .trim(),
  check("url").isURL(),
  check("founding_date").custom(isValidDate),
  check("size_of_organization").isInt({ gt: 3 }),
  check("description")
    .isLength({ min: 1 })
    .escape()
    .trim(),
  check("categories").custom(isArrayOrInt),
  check("resourcing").custom(isArrayOrInt),
  check("technologies").custom(isArrayOrInt)
];

exports.locationSchema = [
  check("title")
    .isLength({ min: 1, max: 255 })
    .escape()
    .trim(),
  check("company_id").custom((value, { req }) => companyExists(value, req)),
  check("address")
    .not()
    .isEmpty()
    .escape()
    .trim(),
  check("city")
    .isAlpha()
    .not()
    .isEmpty()
    .escape()
    .trim(),
  check("zip_code")
    .isAlphanumeric()
    .not()
    .isEmpty()
    .escape()
    .trim(),
  check("country").isISO31661Alpha2(),
  check("state_region")
    .isAlpha()
    .not()
    .isEmpty()
    .escape()
    .trim(),
  check("is_hq")
    .isBoolean()
    .custom((value, { req }) => companyHasHQ(value, req))
];

exports.idSchema = [check("id").isInt()];
exports.companyIdSchema = [check("company_id").isInt()];
