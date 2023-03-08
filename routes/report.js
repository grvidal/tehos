var express = require('express');
var router = express.Router();

function adminonly(req,res,next)
{
  if (!req.session.isadmin)
  {
    return res.redirect('customer/login');
  }
  next();
}

/* Report menu. */
router.get('/', adminonly, function(req, res, next) 
{
  res.render('report/reportmenu');
});


// ==================================================
// Route to list all customers
// URL: http://localhost:3033/report/customer/
// ==================================================
router.get('/customer', adminonly, function(req, res, next) 
{
     let query = "SELECT customer_id, firstname, lastname, city, state, phone, email FROM customer";

    // execute query
    db.query(query, (err, result) => 
    {
        if (err) 
        { 
            console.log(err);
            res.render('error');
        }

        res.render('report/allcusts', {allrecs: result }); 
    });
});


// ==================================================
// Route to list all available products for sale
// URL: http://localhost:3033/report/product/
// ==================================================

router.get('/product', adminonly, function(req, res, next) 
{
     let query = "SELECT product_id, productname, productimage, description, weight, length, width, price, status, packaging_id, category_id FROM product";

    // execute query
    db.query(query, (err, result) => 
    {
        if (err) 
        { 
            console.log(err);
            res.render('error');
        }

        res.render('report/allprods', {allrecs: result }); 
    });
});


// ==================================================
// Route to list all sales
// URL: http://localhost:3033/report/sale/
// ==================================================

router.get('/sale', adminonly, function(req, res, next) 
{
     let query = "SELECT order_id, saledate, paymentstatus, authorizationnum, customer_id FROM saleorder";

    // execute query
    db.query(query, (err, result) => 
    {
        if (err) 
        { 
            console.log(err);
            res.render('error');
        }

        res.render('report/allsales', {allrecs: result }); 
    });
});

module.exports = router;