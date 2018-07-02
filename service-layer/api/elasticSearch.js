const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: 'https://elasticsearch:9200/',
  log: 'trace',
});

exports.testESServer = (req, res) => {
  esClient.ping(
    {
      requestTimeout: 30000,
    },
    (error) => {
      if (error) {
        res.json({ here: 'yes' });
      } else {
        res.json({ here: 'no' });
      }
    },
  );
};
