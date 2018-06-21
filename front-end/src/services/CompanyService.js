import axios from 'axios';
import qs from 'qs';

export const test = (obj) => {};

export const createCompany = async (companyInfo) => {
  console.log(companyInfo);
  const params = qs.stringify(companyInfo);

  try {
    const response = await axios.post('/companies/add', params);
    return response;
    console.log(response);
  } catch (error) {
    console.log(error.errors);
  }
};
