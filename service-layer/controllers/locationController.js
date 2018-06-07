const { STATUS_CODES } = require("../helpers/enums");
const { check, validationResult } = require("express-validator/check");

exports.getLocationById = async (req, res) => {
  const { id } = req.params;
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res
      .status(STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ errors: validationErrors.array() });
  }

  const locations = await req.api.wp.locations().id(id);
  res.status(STATUS_CODES.OK).json(locations);
};

exports.getLocationByCompany = async (req, res) => {
  const { company_id } = req.params;
  const locations = await req.api.wp.locations().company_id(company_id);
  res.json(locations);
};
