const express = require('express');

const router = express.Router();
const companyController = require('../controllers/companyController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(companyController.getCompanies));

module.exports = router;
