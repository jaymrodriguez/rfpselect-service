const { check } = require('express-validator/check');
const { inHTMLData } = require('xss-filters');

const {
  isValidDate, isArrayOrInt, companyExists, companyHasHQ,
} = require('../helpers/helpers');

exports.companySchema = [
  check('title')
    .isLength({ min: 1, max: 255 })
    .escape()
    .trim()
    .customSanitizer(inHTMLData),
  check('name')
    .isLength({ min: 1, max: 255 })
    .escape()
    .trim()
    .customSanitizer(inHTMLData),
  check('url').isURL(),
  check('founding_date').custom(isValidDate),
  check('size_of_organization').isInt({ gt: 3 }),
  check('description')
    .isLength({ min: 1 })
    .escape()
    .trim()
    .customSanitizer(inHTMLData),
  check('categories').custom(isArrayOrInt),
  check('resourcing').custom(isArrayOrInt),
  check('technologies').custom(isArrayOrInt),
];

exports.locationSchema = [
  check('title')
    .isLength({ min: 1, max: 255 })
    .escape()
    .trim()
    .customSanitizer(inHTMLData),
  check('company_id').custom((value, { req }) => companyExists(value, req)),
  check('address')
    .not()
    .isEmpty()
    .escape()
    .trim()
    .customSanitizer(inHTMLData),
  check('city')
    .not()
    .isEmpty()
    .escape()
    .trim()
    .customSanitizer(inHTMLData),
  check('zip_code')
    .not()
    .isEmpty()
    .escape()
    .trim()
    .customSanitizer(inHTMLData),
  check('country').isISO31661Alpha2(),
  check('state_region')
    .not()
    .isEmpty()
    .escape()
    .trim()
    .customSanitizer(inHTMLData),
  check('is_hq')
    .toBoolean()
    .custom((value, { req }) => companyHasHQ(value, req)),
];

exports.idSchema = [check('id').isInt()];
exports.companyIdSchema = [check('company_id').isInt()];
