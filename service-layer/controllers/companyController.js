const WPAPI = require('wpapi');

exports.getCompanies = async (req, res) => {
  const wp = await WPAPI.discover('http://localhost:8000/');
  const posts = await wp.company();
  res.json(posts);
};
