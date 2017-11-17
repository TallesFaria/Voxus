const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const ElasticClient = require("../config/ElasticClient");
const Upload = require('./upload.server.controller')
const multipart = require('connect-multiparty')
const multer = require('multer');
const multipartMiddleware = multipart()

module.exports = app => {
  app.get("/tasks", (req, res) => {
    console.log('=============FETCH TASKS===================')
    console.log(req.body)
    console.log('====================================')
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

  app.post("/fetch-task", (req, res) => {
    console.log('============ID==================');
    console.log(req.body);
    console.log('====================================');
    ElasticClient.get(
      {
        index: "tasks",
        type: "task",
        id: req.body.id
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

  const storage = multer.diskStorage({
    destination: __dirname+"/files",
    filename(req, file, cb) {
      cb(null, `${new Date()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });

  app.post('/upload', upload.single('file'), Upload.upload)
  // app.post('/upload', multipartMiddleware, Upload.upload)
  

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
