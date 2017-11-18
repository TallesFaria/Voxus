const AWS = require('aws-sdk');
const async = require('async');
const bucketName = 'voxustasksmanager';
const path = require('path');
const fs = require('fs');
const ElasticClient = require('../config/ElasticClient');
let pathParams, image, imageName;

/** Load Config File */
AWS.config.loadFromPath('amazonS3.json');

/** After config file load, create object for s3*/
const s3 = new AWS.S3({ region: 'us-east-1' });
const createMainBucket = callback => {
  // Create the parameters for calling createBucket
  const bucketParams = {
    Bucket: bucketName
  };
  s3.headBucket(bucketParams, function(err, data) {
    if (err) {
      console.log('ErrorHeadBucket', err);
      s3.createBucket(bucketParams, function(err, data) {
        if (err) {
          console.log('Error', err);
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    } else {
      callback(null, data);
    }
  });
};

const createItemObject = callback => {
  const params = {
    Bucket: bucketName,
    Key: `${imageName}`,
    ACL: 'public-read',
    Body: image
  };
  s3.putObject(params, function(err, data) {
    if (err) {
      console.log('Error uploading image: ', err);
      callback(err, null);
    } else {
      console.log('Successfully uploaded image on S3', data);
      callback(null, data);
    }
  });
};

exports.upload = (req, res, next) => {
  const files = req.body.files; // file passed from client
  //const meta = req.body;
  let toUpload = [];

  if (files.length > 0) {
    _.forEach(files, file => {
      toUpload.push(awsmainUpload(file));
    });
    return [toUpload];
  } else {
    return null;
  }

  // var tmp_path = req.body.file.path;
  // // console.log("item", req.body.file)
  // // image = fs.createReadStream(tmp_path);
  // // image = fs.createReadStream(file);
  // image = file;
  // imageName = meta.name;
  id = meta.id;
  console.log(id);
  
};

const awsmainUpload = fileDirectory => {
  const uploadImage = fs.createReadStream(fileDirectory.fd);
  const fileName = Math.floor(Date.now() / 1000);
  const params = {
    Bucket: bucket,
    Key: fileName + " " + fileDirectory.fileName,
    Body: uploadImage
  };

  async.series([createMainBucket, createItemObject], (err, result) => {
    if (err) return res.send(err);
    ElasticClient.update(
      {
        script: {
          inline: 'ctx._source.files.add(params.hits)',
          params: { files: `https://voxustasksmanager.s3.amazonaws.com/voxustasksmanager/${imageName}` }
        },
        query: {
          match_all: {}
        }
      },
      function(err, resp, status) {
        console.log(resp);
      }
    );
    return res.json({ message: 'File uploaded successfuly' });
  });
};

exports.displayForm = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(
    '<form action="/upload" method="post" enctype="multipart/form-data">' +
      '<input type="file" name="file">' +
      '<input type="submit" value="Upload">' +
      '</form>'
  );
  res.end();
};
