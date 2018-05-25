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
  // const company = {
  //   title: 'The Apple',
  //   name: 'Apple',
  //   url: 'https://www.apple.com/',
  //   founding_date: new Date('04/04/2015'),
  //   size_of_organization: '1000',
  //   description: 'The best of the best',
  // };
  const comp = await req.api.wp.companies().create({
    title: req.body.title,
    name: req.body.name,
    url: req.body.url,
    founding_date: req.body.founding_date,
    size_of_organization: req.body.size_of_organization,
    description: req.body.description,
    // logo: company.logo,
  });
  res.json(comp);
};
