var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
  let query = "SELECT product_id, productname, productimage, description, weight, length, width, price, status, packaging_id, category_id FROM product WHERE homepage = true";

  // execute query
  db.query(query, (err, result) => 
  {
    if (err) 
    {
      console.log(err);
      res.render('error');
    }

    let query = "select promotitle, promoimage, startdate, enddate from promotion where startdate <= current_date() AND enddate >= current_date()";

    db.query(query, (err, result2) => 
    {
      if (err) 
      {
        console.log(err);
        res.render('error');
      }
      res.render('index', {allrecs: result, promos: result2 });
    });
  });
});

module.exports = router;
