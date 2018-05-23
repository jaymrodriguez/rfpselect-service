const WPAPI = require('wpapi');

exports.getCompanies = async (req, res) => {
  const wp = await WPAPI.discover('http://localhost:8000/');
  res.json(wp);
};
