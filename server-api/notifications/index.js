var express = require('express');
var router = express.Router({mergeParams: true});

const sqs = require('./sqs');
// const checkAuth = require('../util/check-auth');

router.get("/create", sqs.create);
router.get("/list", sqs.list);
router.get("/send", sqs.send);
router.get("/recieve", sqs.recieve);
router.get("/delete", sqs.delete);
router.get("/purge", sqs.purge);
router.get("/setQueue", sqs.set);

module.exports = router;
