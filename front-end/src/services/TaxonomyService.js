export const getResourcing = async () => {
  const response = await fetch('/taxonomies/resourcing');
  const resourcing = await response.json();
  return resourcing;
};

export const getTechnologies = async () => {
  const response = await fetch('/taxonomies/technologies');
  const technologies = await response.json();
  return technologies;
};

export const getCategories = async () => {
  const response = await fetch('/taxonomies/categories');
  const categories = await response.json();
  return categories;
};
