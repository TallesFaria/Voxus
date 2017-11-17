const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const ElasticClient = require("../config/ElasticClient");

module.exports = app => {
  app.get("/tasks", (req, res) => {
    ElasticClient.search(
      {
        index: "tasks",
        type: "task",
        body: {
          query: {
            match: { isTask: true }
          }
        }
      },
      function(error, response, status) {
        if (error) {
          console.log("search error: " + error);
        } else {
          // console.log("--- Response ---");
          // console.log(response);
          // console.log("--- Hits ---");
          // response.hits.hits.forEach(function(hit) {
          //   console.log(hit);
          // });
          res.send(response.hits);
        }
      }
    );
    // ElasticClient.index(
    //   {
    //     index: "tasks",
    //     type: "task",
    //     body: {
    //       size: 20,
    //       query: {
    //         match_all: {}
    //       }
    //     }
    //   },
    //   function(err, resp, status) {
    //     res.send(resp);
    //   }
    // );
  });

  app.post("/new-task", (req, res) => {
    ElasticClient.index(
      {
        index: "tasks",
        type: "task",
        body: {
          name: req.body.taskName,
          description: req.body.description,
          isTask: req.body.isTask
        }
      },
      function(err, resp, status) {
        console.log(resp);
        res.send(resp);
      }
    );
  });

  app.delete("/delete", (req, res) => {
    ElasticClient.indices.delete(
      {
        index: "tasks",
        type: "task",
        id: req.body.id
      },
      function(err, resp, status) {
        if (err) {
          console.log(err);
        } else {
          console.log("delete", resp);
        }
      }
    );

    res.send("Got a DELETE request at /delete");
  });

  app.post("/update", (req, res) => {
    ElasticClient.index(
      {
        index: "tasks",
        type: "task",
        id: req.body.id,
        body: {
          name: req.body.taskName,
          description: req.body.description,
          priority: req.body.priority,
          submittedByUser: req.body.submittedByUser,
          done: req.body.done
        }
      },
      function(err, resp, status) {
        console.log(resp);
      }
    );

    res.send("Update - Success");
  });

  app.post("/upload-files", (req, res) => {
    ElasticClient.index(
      {
        index: "tasks",
        type: "task",
        id: req.body.id,
        body: {
          path: req.body.path
        }
      },
      function(err, resp, status) {
        console.log(resp);
      }
    );

    res.send("Update - Success");
  });

  app.post("/done", (req, res) => {
    ElasticClient.index(
      {
        index: "tasks",
        type: "task",
        id: req.body.id,
        body: {
          done: req.body.done
        }
      },
      function(err, resp, status) {
        console.log(resp);
      }
    );

    res.send("Update - Success");
  });

  // app.get('/tasks', requireLogin, (req, res) => {
  //   res.send(tasks);
  // });
};
