const WPAPI = require('wpapi');

exports.getCompanies = async (req, res) => {
  const wp = await WPAPI.discover('http://localhost:8000/');
  const companies = await wp.company();
  res.json(companies);
};

exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log('mmg');
  const wp = await WPAPI.discover('http://localhost:8000/');
  const company = await wp.company().id(id);
  res.json(company);
};
