const elasticsearch = require("elasticsearch");

const ElasticClient = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});

module.exports = ElasticClient;
