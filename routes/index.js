var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Load Spreadsheet', subtitle : 'HEA Analysis Spreadsheet Loader' });
});

module.exports = router;
