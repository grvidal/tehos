var express = require('express');
var router = express.Router();

// ==================================================
// Route to view one specific record. Notice the view is one record
// http://localhost:3033/search?searchcriteria=desk
// ==================================================

router.get('/', function(req, res, next) 
{
    let query = "SELECT product_id, productname, productimage, description, weight, length, width, price, status, packaging_id, category_id FROM product WHERE description LIKE '%" + req.query.searchcriteria + "%' OR productname LIKE '%" + req.query.searchcriteria + "%'";

    console.log("Query: " + query );

    // execute query
    db.query(query, (err, result) => 
    {
        if (err) 
        {
            console.log(err);
            res.render('error');
        }

        else 
        {
            res.render('search', {allrecs: result});
        } 
    });
});

module.exports = router;