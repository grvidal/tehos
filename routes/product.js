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

// ==================================================
// Route to list all records. Display view to list all records 
// URL: http://localhost:3033/product/
// ==================================================

router.get('/', adminonly, function(req, res, next) 
{
     let query = "SELECT product_id, productname, productimage, description, weight, length, width, price, status, packaging_id, category_id, homepage FROM product";

    // execute query
    db.query(query, (err, result) => 
    {
        if (err) 
        { 
            console.log(err);
            res.render('error');
        }

        res.render('product/allrecords', {allrecs: result }); 
    });
});


// ==================================================
// Route to view one specific record. Notice the view is one record 
// URL: http://localhost:3033/product/2/show
// ================================================== 

router.get('/:recordid/show', function(req, res, next) 
{
    let query = "SELECT product_id, productname, productimage, description, weight, length, width, price, status, packaging_id, category_id, homepage FROM product WHERE product_id = " + req.params.recordid;

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
            let query = "SELECT review_id, reviewdate, comments, rating, customer_id, product_id FROM review WHERE product_id = " + req.params.recordid + " AND status = 'Publish'";

            // execute query
            db.query(query, (err, result2) => 
            {
                if (err) 
                {
                    console.log(err);
                    res.render('error');
                } 
                else 
                {
                    res.render('product/onerec', {onerec: result[0], reviews :  result2});
                }
            });
        }
    });
});


// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3033/product/addrecord
// ==================================================

router.get('/addrecord', adminonly, function(req, res, next) 
{
    let query = "SELECT category_id, categoryname FROM category";

    db.query(query, (err, result) => 
    {
        if (err) 
        {
            console.log(err);
            res.render('error');
        }
        res.render('product/addrec', {category: result});
    });
});


// ================================================== 
// Route to obtain user input and save in database. 
// ================================================== 

router.post('/', adminonly, function(req, res, next) 
{
    let insertquery = "INSERT INTO product (productname, productimage, description, weight, length, width, price, status, packaging_id, category_id, homepage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    var homepage_value=0;
    if (req.body.homepage)
        {
           homepage_value = 1;
        }
    
    db.query(insertquery,
        [req.body.productname, req.body.productimage, req.body.description,req.body.weight, req.body.length, req.body.width, req.body.price, req.body.status,req.body.packaging_id, req.body.category_id, homepage_value],
        (err, result) => 
        { 
            if (err) 
            {
                console.log(err); 
                res.render('error');
            } 
            else 
            {
                res.redirect( '/product'); 
            }
        });
});



// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3033/product/2/edit
// ================================================== 

router.get('/:recordid/edit', adminonly, function(req, res, next) 
{
    let query = "SELECT product_id, productname, productimage, description, weight, length, width, price, status, packaging_id, category_id, homepage FROM product WHERE product_id = " + req.params.recordid;
      
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
            let query = "SELECT category_id, categoryname FROM category";

            db.query(query, (err, result2) => 
            {
                if (err) 
                {
                    console.log(err);
                    res.render('error');
                }

                res.render('product/editrec', {onerec: result[0], category: result2 });
            });
       }
    });    
});



// ================================================== 
// Route to save edited data in database.
// ================================================== 

router.post('/save', adminonly, function(req, res, next) 
{
    let updatequery = "UPDATE product SET productname = ?, productimage = ?, description = ?, weight = ?, length = ?, width = ?, price = ?, status = ?, packaging_id = ?, category_id = ?, homepage = ? WHERE product_id = " + req.body.product_id;

    var homepage_value=0;
    if (req.body.homepage)
        {
           homepage_value = 1;
        }

    db.query(updatequery,
        [req.body.productname, req.body.productimage, req.body.description, req.body.weight, req.body.length, req.body.width, req.body.price, req.body.status, req.body.packaging_id, req.body.category_id, homepage_value],
        (err, result) => 
        {
            if (err) 
            {
                console.log(err);
                res.render('error');
            } 
            else 
            {
                res.redirect( '/product'); 
            }
        });
});


// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3033/product/2/delete
// ================================================== 

router.get('/:recordid/delete', adminonly, function(req, res, next) 
{
    let query = "DELETE FROM product WHERE product_id = " +  req.params.recordid;

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
                res.redirect( '/product');
            } 
    });
});

module.exports = router;