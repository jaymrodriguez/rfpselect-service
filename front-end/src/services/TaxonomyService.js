import axios from 'axios';

const baseURL = process.env.REACT_APP_PROXY;

export const getResourcing = async () => axios.get(`${baseURL}/taxonomies/resourcing`);
export const getTechnologies = async () => axios.get(`${baseURL}/taxonomies/technologies`);

export const getCategories = async () => axios.get(`${baseURL}/taxonomies/categories`);
