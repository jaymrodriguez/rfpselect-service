import axios from 'axios';

export const getResourcing = async () => axios.get('/taxonomies/resourcing');

export const getTechnologies = async () => axios.get('/taxonomies/technologies');

export const getCategories = async () => axios.get('/taxonomies/categories');
