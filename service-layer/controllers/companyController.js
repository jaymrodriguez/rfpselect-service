exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  const company = await req.api.wp.companies().id(id);
  res.json(company);
};

exports.getCompanies = async (req, res) => {
  const companies = await req.api.wp.companies();
  res.json(companies);
};
