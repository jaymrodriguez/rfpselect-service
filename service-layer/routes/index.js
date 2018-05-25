const express = require('express');

const router = express.Router();
const companyController = require('../controllers/companyController');
const { catchErrors } = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/companies', catchErrors(companyController.getCompanies));
router.get('/companies/:id', catchErrors(companyController.getCompanyById));
router.post('/create', catchErrors(companyController.createCompany));

module.exports = router;
