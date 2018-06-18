const { STATUS_CODES } = require('../helpers/enums');

exports.getTaxonomies = async (req, res) => {
  const taxonomies = await req.api.wp.taxonomies();
  res.status(STATUS_CODES.OK).send(taxonomies);
};

exports.getCategories = async (req, res) => {
  //   const { name } = req.params;
  //   //   const taxonomy = await req.api.wp.taxonomies().taxonomy('category');
  //   const taxonomiesURL = {
  //     categories: async () => req.api.wp.categories(),
  //     resourcing: async () => req.api.wp.resourcing(),
  //     technologies: async () => req.api.wp.technologies(),
  //   };
  const categories = await req.api.wp.categories();

  const categoriesShort = categories.map(category => ({
    id: category.id,
    name: category.name,
    parent: category.parent,
  }));

  res.status(STATUS_CODES.OK).send(categoriesShort);
};

exports.getResourcing = async (req, res) => {
  const resourcing = await req.api.wp.resourcing();

  const resourcingShort = resourcing.map(resource => ({
    id: resource.id,
    name: resource.name,
    parent: resource.parent,
  }));

  res.status(STATUS_CODES.OK).send(resourcingShort);
};

exports.getTechnologies = async (req, res) => {
  const technologies = await req.api.wp.technologies();

  const technologiesShort = technologies.map(tech => ({
    id: tech.id,
    name: tech.name,
    parent: tech.parent,
  }));

  res.status(STATUS_CODES.OK).send(technologiesShort);
};
