import axios from 'axios';
import qs from 'qs';

export const test = () => {};

export const createCompany = async (companyInfo) => {
  const params = qs.stringify(companyInfo, { indices: false });
  try {
    const response = await axios.post('/companies/add', params);
    return response;
  } catch (error) {
    return error;
  }
};
