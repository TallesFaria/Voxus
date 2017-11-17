const ElasticClient = require('../../config/ElasticClient');

ElasticClient.indices.create(
  {
    index: 'tasks'
  },
  function(err, resp, status) {
    if (err) {
      console.log(err);
    } else {
      console.log('create', resp);
    }
  }
);

module.exports = CreateIndex;
