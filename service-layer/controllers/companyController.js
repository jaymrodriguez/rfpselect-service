const { check, validationResult } = require("express-validator/check");

exports.getCompanyById = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ errors: validationErrors.array() });
  }

  const { id } = req.params;
  const company = await req.api.wp.companies().id(id);
  res.status(200).send(company);
};

exports.getCompanies = async (req, res) => {
  const companies = await req.api.wp.companies();
  res.status(200).send(companies);
};

exports.createCompany = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ errors: validationErrors.array() });
  }

  const companyInfo = {
    title: req.body.title,
    status: "publish",
    categories: req.body.categories,
    resourcing: req.body.resourcing,
    technologies: req.body.technologies,
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
  res.status(201).send(company);
};
