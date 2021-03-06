const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const ElasticClient = require('../config/ElasticClient');
const Upload = require('./upload.server.controller');
const multipart = require('connect-multiparty');
const multer = require('multer');
const multipartMiddleware = multipart();

module.exports = app => {
  app.get('/tasks', (req, res) => {
    ElasticClient.search(
      {
        index: 'tasks',
        type: 'task',
        body: {
          query: {
            match_all: {}
          },
          size: 20
        }
      },
      function(error, response, status) {
        if (error) {
          console.log('search error: ' + error);
        } else {
          res.send(response.hits);
        }
      }
    );
  });

  app.post('/new-task', (req, res) => {
    console.log('=============CREATE TASK====================');
    console.log(req.body);
    console.log('====================================');
    ElasticClient.index(
      {
        index: 'tasks',
        type: 'task',
        body: {
          name: req.body.taskName,
          description: req.body.description,
          priority: req.body.priority,
          done: false,
          createdBy: req.body.createdBy,
          isTask: true
        }
      },
      function(err, resp, status) {
        console.log(resp);
        res.send(resp);
      }
    );
  });

  app.post('/fetch-task', (req, res) => {
    ElasticClient.get(
      {
        index: 'tasks',
        type: 'task',
        id: req.body.id
      },
      function(err, resp, status) {
        console.log(resp);
        res.send(resp);
      }
    );
  });

  app.post('/delete', (req, res) => {
    console.log('==========DELETE API======================');
    console.log(req.body);
    console.log('====================================');
    ElasticClient.delete(
      {
        index: 'tasks',
        type: 'task',
        id: req.body.id
      },
      function(err, resp, status) {
        if (err) {
          console.log(err);
        } else {
          console.log('delete', resp);
        }
      }
    );

    res.send('Got a DELETE request at /delete');
  });


  app.post('/update-task', (req, res) => {
    console.log('===========UPDATE API=====================');
    console.log(req.body);
    console.log('====================================');
    ElasticClient.update(
      {
        index: 'tasks',
        type: 'task',
        id: req.body.id,
        body: {
          doc: {
            name: req.body.taskName,
            description: req.body.description,
            priority: req.body.priority,
            createdBy: req.body.createdBy
          }
        }
      },
      function(err, resp, status) {
        console.log('==============RESPONSE UPDATE=================');
        console.log(resp);
        console.log('====================================');
        res.redirect('/');
      }
    );
  });

  const storage = multer.diskStorage({
    destination: __dirname + '/files',
    filename(req, file, cb) {
      cb(null, `${new Date()}-${file.originalname}`);
    }
  });

  const upload = multer({ storage });

  app.post('/upload', upload.single('file'), Upload.upload);
  // app.post('/upload', multipartMiddleware, Upload.upload)

  app.post('/done', (req, res) => {
    console.log('===========DONE API======================');
    console.log(req.body);
    console.log('====================================');
    ElasticClient.update(
      {
        index: 'tasks',
        type: 'task',
        id: req.body.id,
        body: {
          doc: {
            done: req.body.done,
            doneBy: req.body.doneBy
          }
        }
      },
      function(err, resp, status) {
        console.log(resp);
      }
    );

    // ElasticClient.index(
    //   {
    //     index: 'tasks',
    //     type: 'task',
    //     id: req.body.id,
    //     body: {
    //       doc: {
    //         done: req.body.done,
    //         doneBy: req.body.doneBy
    //       }
    //     }
    //   },
    //   function(err, resp, status) {
    //     console.log(resp);
    //   }
    // );
    res.send('Update - Success');
  });

  // app.get('/tasks', requireLogin, (req, res) => {
  //   res.send(tasks);
  // });
};
