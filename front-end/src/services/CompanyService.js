import axios from 'axios';
import qs from 'qs';

const baseURL = process.env.REACT_APP_PROXY;

export const createCompany = async (companyInfo) => {
  const params = qs.stringify(companyInfo, { indices: false });
  try {
    const response = await axios.post(`${baseURL}/companies/add`, params);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createLocation = async (location) => {
  console.log(location);
  const params = qs.stringify(location, { indices: false });
  console.log(params);
  try {
    const response = await axios.post(`${baseURL}/locations/add`, params);
    return response;
  } catch (error) {
    return error.response;
  }
};
