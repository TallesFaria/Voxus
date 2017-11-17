const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const ElasticClient = require("../config/ElasticClient");

module.exports = app => {
  app.get("/tasks", (req, res) => {
    ElasticClient.index(
      {
        index: "tasks",
        type: "task",
        size: "20",
        query: {
          match_all: {}
        }
      },
      function(err, res, status) {
        res.send(res);
      }
    );
  });

  app.post("/new-task", (req, res) => {
    ElasticClient.index(
      {
        index: "tasks",
        type: "task",
        body: {
          name: req.body.taskName,
          description: req.body.description
        }
      },
      function(err, resp, status) {
        console.log(resp);
      }
    );

    res.send("Success");
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

const tasks = [
  {
    id: 1,
    taskName: "Leanne Graham",
    description: "dfabsdfbkak",
    anexos: [],
    priority: 2,
    submittedByUser: "Joao",
    done: false
  },
  {
    id: 2,
    taskName: "Ervin Howell",
    description: "dfabsdfbkak",
    anexos: [],
    priority: 2,
    submittedByUser: "Joao",
    done: false
  },
  {
    id: 3,
    taskName: "Clementine Bauch",
    description: "dfabsdfbkak",
    anexos: [],
    priority: 2,
    submittedByUser: "Joao",
    done: false
  },
  {
    id: 4,
    taskName: "Patricia Lebsack",
    description: "dfabsdfbkak",
    anexos: [],
    priority: 2,
    submittedByUser: "Joao",
    done: false
  },
  {
    id: 5,
    taskName: "Chelsey Dietrich",
    description: "dfabsdfbkak",
    anexos: [],
    priority: 2,
    submittedByUser: "Joao",
    done: false
  }
];
