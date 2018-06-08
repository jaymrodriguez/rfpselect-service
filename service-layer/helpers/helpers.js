exports.isValidDate = dateString => {
  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  // taken from: // Validates that the input string is a valid date formatted as "mm/dd/yyyy"

  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  // Parse the date parts to integers
  const parts = dateString.split("/");
  const day = parseInt(parts[1], 10);
  const month = parseInt(parts[0], 10);
  const year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

exports.isArrayOrInt = input => {
  if (Array.isArray(input) && input.every(Number.isInteger)) return true;
  if (!isNaN(parseInt(input, 10))) return true;
  return false;
};

exports.companyExists = async (company_id, req) => {
  const id = parseInt(company_id, 10);

  if (!Number.isInteger(id)) return false;

  const company = await req.api.wp.companies().id(id);

  if (company.hasOwnProperty("code")) return false;
  return true;
};

exports.companyHasHQ = async (is_hq, req) => {
  const is_hq_bool = is_hq === "true";

  if (!is_hq_bool) return true;

  const { company_id } = req.body;
  const locations = await req.api.wp.locations().company_id(company_id);

  for (const location of locations) {
    if (location.acf.is_hq) return false;
  }

  return true;
};
