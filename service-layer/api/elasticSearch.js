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
        res.json({ here: 'no' });
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
