const express = require("express");

const router = express.Router();
const companyController = require("../controllers/companyController");
const locationController = require("../controllers/locationController");
const { catchErrors } = require("../handlers/errorHandlers");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

/* Company routes. */
router.get("/companies", catchErrors(companyController.getCompanies));
router.get("/companies/:id", catchErrors(companyController.getCompanyById));
router.post("/companies/add", catchErrors(companyController.createCompany));

/* Location routes. */
router.get("/locations", catchErrors(locationController.getLocations));
router.get("/locations/:id", catchErrors(locationController.getLocationById));
router.get(
  "/locations/company/:id",
  catchErrors(locationController.getLocationByCompany)
);
module.exports = router;
