exports.isValidDate = (dateString) => {
  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  // taken from: // Validates that the input string is a valid date formatted as "mm/dd/yyyy"

  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  // Parse the date parts to integers
  const parts = dateString.split('/');
  const day = parseInt(parts[1], 10);
  const month = parseInt(parts[0], 10);
  const year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

exports.isArrayOrInt = (input) => {
  if (Array.isArray(input) && input.every(Number.isInteger)) return true;
  if (!Number.isNaN(parseInt(input, 10))) return true;
  return false;
};

exports.companyExists = async (companyId, req) => {
  const id = parseInt(companyId, 10);
  const has = Object.prototype.hasOwnProperty;

  if (!Number.isInteger(id)) return false;

  const company = await req.api.wp.companies().id(id);

  if (has.call(company, has)) return false;

  return true;
};

exports.companyHasHQ = async (isHq, req) => {
  if (!isHq) return true;

  const { company_id } = req.body;
  const locations = await req.api.wp.locations().company_id(company_id);
  const hasHq = locations.findIndex(location => location.acf.is_hq === true);

  // If company we are editting is the same as the HQ return TRUE
  if (
    req.method === 'PUT' &&
    hasHq > -1 &&
    locations[hasHq].acf.company_id === Number.parseInt(company_id, 10)
  ) {
    return true;
  }

  return hasHq === -1;
};
