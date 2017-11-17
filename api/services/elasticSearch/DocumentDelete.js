const ElasticClient = require("./ElasticClient");

ElasticClient.delete(
  {
    index: "tasks",
    id: "1",
    type: "constituencies"
  },
  function(err, resp, status) {
    console.log(resp);
  }
);
