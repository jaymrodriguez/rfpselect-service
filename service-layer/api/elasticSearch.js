const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: 'http://elasticsearch:9200/',
  log: 'trace',
});

exports.testESServer = (req, res) => {
  esClient.ping(
    {
      requestTimeout: 30000,
    },
    (error) => {
      if (error) {
        res.json({ here: error });
      } else {
        res.json({ here: 'IT WORKS!!' });
      }
    },
  );
};

exports.simpleSearch = async (req, res) => {
  const results = await esClient.search({
    index: 'rfpindex',
    type: 'wpsolr_types',
    body: {
      query: {
        match: {
          content: req.params.query,
        },
      },
    },
  });

  res.status(200).json(results);
};

exports.companySearch = async (req, res) => {
  const results = await esClient.search({
    index: 'rfpindex',
    type: 'wpsolr_types',
    body: {
      query: {
        bool: {
          must: {
            multi_match: {
              query: req.params.query,
              // fields: ['categories_str', 'technologies_str', 'name_str'],
              fields: ['title', 'name_str'],
            },
          },
          filter: {
            term: { type: 'company' },
          },
        },
      },
    },
  });

  res.status(200).json(results);
};

// exports.companySearch = async (req, res) => {
//   const results = await esClient.search({
//     index: 'rfpindex',
//     type: 'wpsolr_types',
//     body: {
//       query: {
//         multi_match: {
//           query: req.params.query,
//           // fields: ['categories_str', 'technologies_str', 'name_str'],
//           fields: ['title', 'name_str'],
//         },
//       },
//       filter: {
//         term: { type: 'company' },
//       },
//     },
//   });

//   res.status(200).json(results);
// };
