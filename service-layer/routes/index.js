const express = require('express');

const router = express.Router();

const companyController = require('../controllers/companyController');
const locationController = require('../controllers/locationController');
const { catchErrors } = require('../handlers/errorHandlers');
const { runValidations } = require('../handlers/validationHandler');
const {
  companySchema, idSchema, companyIdSchema, locationSchema,
} = require('../schema/schema');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

/* Company routes. */
router.get('/companies', catchErrors(companyController.getCompanies));
router.get(
  '/companies/:id',
  idSchema,
  runValidations,
  catchErrors(companyController.getCompanyById),
);
router.post(
  '/companies/add',
  companySchema,
  runValidations,
  catchErrors(companyController.createCompany),
);
router.put(
  '/companies/update/:id',
  companySchema,
  idSchema,
  runValidations,
  catchErrors(companyController.updateCompany),
);

/* Location routes. */
router.get(
  '/locations/:id',
  idSchema,
  runValidations,
  catchErrors(locationController.getLocationById),
);
router.get(
  '/locations/company/:company_id',
  companyIdSchema,
  runValidations,
  catchErrors(locationController.getLocationByCompany),
);
router.post(
  '/locations/add',
  locationSchema,
  runValidations,
  catchErrors(locationController.createLocation),
);
router.put(
  '/locations/update/:id',
  locationSchema,
  idSchema,
  runValidations,
  catchErrors(locationController.updateLocation),
);

module.exports = router;
