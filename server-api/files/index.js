'use strict';

const express = require('express');
var router = express.Router({mergeParams: true});
var fs = require('fs');
const controller = require('./files.controller');
var {mediaHost}=require('../config')
const multer = require('multer');
const uuidv4 = require('uuid/v4');
var filename=''
const storage = multer.diskStorage({
    destination: mediaHost(),
    filename(req, file, cb) {
        var dir='/uploads'
        filename=`${dir}/`+uuidv4()+'.'+file.originalname.split('.')[file.originalname.split('.').length-1]
      cb(null, filename);
    },
  });
  const upload = multer({ storage });


router.post('/',upload.single('file'), controller.filesUpload);

module.exports = router;
