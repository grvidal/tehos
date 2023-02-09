var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records 
// URL: http://localhost:3033/product/
// ==================================================

router.get('/', function(req, res, next) 
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

        res.render('product/allrecords', {allrecs: result }); 
    });
});


// ==================================================
// Route to view one specific record. Notice the view is one record 
// URL: http://localhost:3033/product/2/show
// ================================================== 

router.get('/:recordid/show', function(req, res, next) 
{
    let query = "SELECT product_id, productname, productimage, description, weight, length, width, price, status, packaging_id, category_id FROM product WHERE product_id = " + req.params.recordid;

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
            res.render('product/onerec', {onerec: result[0] });
        }
    });
});


// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3033/product/addrecord
// ==================================================

router.get('/addrecord', function(req, res, next) 
{
    res.render('product/addrec');
});


// ================================================== 
// Route to obtain user input and save in database. 
// ================================================== 

router.post('/', function(req, res, next) 
{
    let insertquery = "INSERT INTO product (productname, productimage, description, weight, length, width, price, status, packaging_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
             
    db.query(insertquery,
        [req.body.productname, req.body.productimage, req.body.description,req.body.weight, req.body.length, req.body.width, req.body.price, req.body.status,req.body.packaging_id, req.body.category_id],
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

router.get('/:recordid/edit', function(req, res, next) 
{
    let query = "SELECT product_id, productname, productimage, description, weight, length, width, price, status, packaging_id, category_id FROM product WHERE product_id = " + req.params.recordid;
      
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
            res.render('product/editrec', {onerec: result[0] });
       }
    });    
});



// ================================================== 
// Route to save edited data in database.
// ================================================== 

router.post('/save', function(req, res, next) 
{
    let updatequery = "UPDATE product SET productname = ?, productimage = ?, description = ?, weight = ?, length = ?, width = ?, price = ?, status = ?, packaging_id = ?, category_id = ? WHERE product_id = " + req.body.product_id;

    db.query(updatequery,
        [req.body.productname, req.body.productimage, req.body.description, req.body.weight, req.body.length, req.body.width, req.body.price, req.body.status, req.body.packaging_id, req.body.category_id],
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

router.get('/:recordid/delete', function(req, res, next) 
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