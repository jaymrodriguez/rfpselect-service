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
  resourcing: res => (res.length > 0 ? false : 'Must have at least one resourcing option.'),
  categories: cat => (cat.length > 0 ? false : 'Must have at least one category option.'),
  technologies: tech => (tech.length > 0 ? false : 'Must have at least one technology option'),
};

export const locationRules = {
  address: address => (!validator.isEmpty(address) ? false : "Address can't be empty."),
  city: city => (!validator.isEmpty(city) ? false : "City can't be empty."),
  zip_code: zip_code => (!validator.isEmpty(zip_code) ? false : "Zip Code can't be empty."),
  state_region: state_region =>
    (!validator.isEmpty(state_region) ? false : "Region can't be empty."),
  country: country => (!validator.isISO31661Alpha2(country) ? false : 'Invalid value for country.'),
  is_hq: is_hq => (!validator.isBoolean(is_hq) ? false : 'Invalid value for IS HQ.'),
};

export const runValidations = (fields, rules) => {
  const validationErrors = [];
  //   this.setState({ validationErrors }); // clean previous ones

  Object.keys(rules).forEach((fieldName) => {
    const error = rules[fieldName].call(null, fields[fieldName]);
    if (error) {
      validationErrors.push(error);
    }
  });
  return validationErrors;
};

// module.exports = {
//   runValidations,
//   locationRules,
//   companyRules,
// };
