exports.getLocations = async (req, res) => {
  const locations = await req.api.wp.locations();
  res.json(locations);
};

exports.getLocationById = async (req, res) => {
  const { id } = req.params;
  const locations = await req.api.wp.locations().id(id);
  res.json(locations);
};

exports.getLocationByCompany = async (req, res) => {
  const { company_id } = req.params;
  const locations = await req.api.wp.locations().company_id(company_id);
  res.json(locations);
};
