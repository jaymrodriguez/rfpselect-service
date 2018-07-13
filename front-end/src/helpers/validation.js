import validator from 'validator';

export const companyRules = {
  name: name =>
    (validator.isLength(name, { min: 2, max: 255 })
      ? false
      : 'Name should be between 2 and 255 letters.'),
  url: url => (validator.isURL(url) ? false : 'URL must be valid.'),
  founding_date: date => (date !== 'Invalid date' ? false : 'Invalid date format.'),
  size_of_organization: size => (size > 3 ? false : 'Organization must have at least 4 members.'),
  description: desc => (!validator.isEmpty(desc) ? false : "Description can't be empty"),
  resourcing: res => (res.length > 0 ? false : 'Select one or more options.'),
  categories: cat => (cat.length > 0 ? false : 'Select one or more options.'),
  technologies: tech => (tech.length > 0 ? false : 'Select one or more options.'),
};

export const locationRules = {
  address: address => (!validator.isEmpty(address) ? false : "Address can't be empty."),
  city: city => (!validator.isEmpty(city) ? false : "City can't be empty."),
  zip_code: zip_code => (!validator.isEmpty(zip_code) ? false : "Zip Code can't be empty."),
  state_region: state_region =>
    (!validator.isEmpty(state_region) ? false : "Region can't be empty."),
  country: country => (validator.isISO31661Alpha2(country) ? false : 'Invalid value for country.'),
  is_hq: is_hq => (typeof is_hq === typeof true ? false : 'Invalid value for IS HQ.'),
};

export const runValidations = (fields, rules) => {
  let validationErrors = {};

  Object.keys(rules).forEach((fieldName) => {
    const error = rules[fieldName].call(null, fields[fieldName]);
    if (error) {
      validationErrors = {
        ...validationErrors,
        [fieldName]: error,
      };
    }
  });
  return validationErrors;
};

export const displayValidationError = (propertyName, validationErrors) => (Object.prototype.hasOwnProperty.call(validationErrors, propertyName) ? 'error' : null);
