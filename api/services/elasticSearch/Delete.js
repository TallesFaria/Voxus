const ElasticClient = require("./ElasticClient");

ElasticClient.indices.delete(
  {
    index: "tasks"
  },
  function(err, resp, status) {
    if (err) {
      console.log(err);
    } else {
      console.log("delete", resp);
    }
  }
);
