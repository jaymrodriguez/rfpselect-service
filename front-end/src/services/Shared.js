import { STATUS_CODES } from '../helpers/enums';

export const createResource = async (resource, createFunction) => {
  const promise = createFunction(resource);
  const response = await promise;

  if (response.status !== STATUS_CODES.CREATED) {
    // print validation errors
    const validationErrors = response.data.errors.map(error => `${error.msg} for ${error.param}`);
    return { errors: validationErrors };
  }
  return {
    errors: null,
    response,
  };
};

// module.exports = {
//   createResource,
// };
