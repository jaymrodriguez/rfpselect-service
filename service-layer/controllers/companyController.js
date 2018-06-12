const { STATUS_CODES } = require('../helpers/enums');

exports.getCompanyById = async (req, res) => {
  const { id } = req.params;

  const company = await req.api.wp.companies().id(id);
  res.status(STATUS_CODES.OK).send(company);
};

exports.getCompanies = async (req, res) => {
  const companies = await req.api.wp.companies();
  res.status(STATUS_CODES.OK).send(companies);
};

exports.createCompany = async (req, res) => {
  const companyInfo = {
    title: req.body.title,
    status: 'publish',
    categories: req.body.categories,
    resourcing: req.body.resourcing,
    technologies: req.body.technologies,
    fields: {
      name: req.body.name,
      url: req.body.url,
      founding_date: req.body.founding_date,
      size_of_organization: req.body.size_of_organization,
      description: req.body.description,
      // logo: company.logo,
    },
  };
  const company = await req.api.wp.companies().create(companyInfo);
  res.status(STATUS_CODES.CREATED).send(company);
};

exports.updateCompany = async (req, res) => {
  const { id } = req.params;

  const companyInfo = {
    title: req.body.title,
    status: 'publish',
    categories: req.body.categories,
    resourcing: req.body.resourcing,
    technologies: req.body.technologies,
    fields: {
      name: req.body.name,
      url: req.body.url,
      founding_date: req.body.founding_date,
      size_of_organization: req.body.size_of_organization,
      description: req.body.description,
      // logo: company.logo,
    },
  };
  const company = await req.api.wp
    .companies()
    .id(id)
    .update(companyInfo);
  res.status(STATUS_CODES.OK).send(company);
};
