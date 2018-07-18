const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: process.env.ES_URL,
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
            match: {
              content: req.params.query,
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
//         bool: {
//           must: {
//             multi_match: {
//               query: req.params.query,
//               type: 'cross_fields',
//               // type: 'best_fields',
//               // analyzer: 'standard',
//               fields: ['title', 'categories_str', 'technologies_str'],
//               // operator: 'and',
//             },
//           },
//           filter: {
//             term: { type: 'company' },
//           },
//         },
//       },
//     },
//   });

//   res.status(200).json(results);
// };
