import axios from 'axios';

export const getResourcing = async () => {
  const resourcing = await axios.get('/taxonomies/resourcing');
  return resourcing.data;
};

export const getTechnologies = async () => {
  const technologies = await axios.get('/taxonomies/technologies');
  return technologies.data;
};

export const getCategories = async () => {
  const categories = await axios.get('/taxonomies/categories');
  return categories.data;
};
