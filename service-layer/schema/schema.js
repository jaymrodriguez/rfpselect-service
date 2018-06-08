const { check } = require("express-validator/check");
const {
  isValidDate,
  isArrayOrInt,
  companyExists
} = require("../helpers/helpers");

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

exports.locationSchema = [
  check("title").isLength({ min: 1, max: 255 }),
  check("company_id").custom((value, { req }) => companyExists(value, req)),
  check("address")
    .not()
    .isEmpty(),
  check("city")
    .isAlpha()
    .not()
    .isEmpty(),
  check("zip_code")
    .isAlphanumeric()
    .not()
    .isEmpty(),
  check("country").isISO31661Alpha2(),
  check("state_region")
    .isAlpha()
    .not()
    .isEmpty(),
  check("is_hq").isBoolean()
];

exports.idSchema = [check("id").isInt()];
exports.companyIdSchema = [check("company_id").isInt()];
