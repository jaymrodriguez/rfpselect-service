exports.getLocations = async (req, res) => {
  const locations = await req.api.wp.locations();
  res.json(locations);
};
