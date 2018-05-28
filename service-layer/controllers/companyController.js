exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  const company = await req.api.wp.companies().id(id);
  res.json(company);
};

exports.getCompanies = async (req, res) => {
  const companies = await req.api.wp.companies();
  res.json(companies);
};

exports.createCompany = async (req, res) => {
  const companyInfo = {
    title: req.body.title,
    status: "publish",
    fields: {
      name: req.body.name,
      url: req.body.url,
      founding_date: req.body.founding_date,
      size_of_organization: req.body.size_of_organization,
      description: req.body.description
      // logo: company.logo,
    }
  };
  const company = await req.api.wp.companies().create(companyInfo);
  res.json(company);
};
