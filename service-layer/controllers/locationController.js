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
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res
      .status(STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ errors: validationErrors.array() });
  }

  const locations = await req.api.wp.locations().company_id(company_id);

  locations.length > 0
    ? res.status(STATUS_CODES.OK).json(locations)
    : res.status(STATUS_CODES.NOT_FOUND).json({});
};

exports.createLocation = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res
      .status(STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ errors: validationErrors.array() });
  }

  const locationInfo = {
    title: req.body.title,
    status: "publish",
    fields: {
      company_id: req.body.company_id,
      address: req.body.address,
      address_2: req.body.address_2,
      city: req.body.city,
      zip_code: req.body.zip_code,
      state_region: req.body.state_region,
      country: req.body.country,
      is_hq: req.body.is_hq
    }
  };

  const location = await req.api.wp.locations().create(locationInfo);

  res.status(STATUS_CODES.CREATED).json(location);
};
