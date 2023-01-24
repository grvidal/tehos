var express = require('express');
var router = express.Router();

/* GET policy page. */
router.get('/', function(req, res, next) {
  res.render('policy');
});

module.exports = router;