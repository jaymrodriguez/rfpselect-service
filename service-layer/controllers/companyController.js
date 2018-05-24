const WPAPI = require('wpapi');

exports.getCompanies = async (req, res) => {
  const wp = await WPAPI.discover('http://0.0.0.0:8000/');
  const companies = await wp.company();
  res.json(companies);
};

exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  const wp = await WPAPI.discover('http://0.0.0.0:8000/');
  const company = await wp.company().id(id);
  res.json(company);
};
