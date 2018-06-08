const express = require("express");
const router = express.Router();

const companyController = require("../controllers/companyController");
const locationController = require("../controllers/locationController");
const { catchErrors } = require("../handlers/errorHandlers");
const {
  companySchema,
  idSchema,
  companyIdSchema,
  locationSchema
} = require("../schema/schema");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

/* Company routes. */
router.get("/companies", catchErrors(companyController.getCompanies));
router.get(
  "/companies/:id",
  idSchema,
  catchErrors(companyController.getCompanyById)
);
router.post(
  "/companies/add",
  companySchema,
  catchErrors(companyController.createCompany)
);
router.put(
  "/companies/update/:id",
  companySchema,
  idSchema,
  catchErrors(companyController.updateCompany)
);

/* Location routes. */
router.get(
  "/locations/:id",
  idSchema,
  catchErrors(locationController.getLocationById)
);
router.get(
  "/locations/company/:company_id",
  companyIdSchema,
  catchErrors(locationController.getLocationByCompany)
);
router.post(
  "/locations/add",
  locationSchema,
  catchErrors(locationController.createLocation)
);

module.exports = router;
