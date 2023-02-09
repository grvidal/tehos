var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records 
// URL: http://localhost:3033/saleorder/
// ==================================================

router.get('/', function(req, res, next) 
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

        res.render('saleorder/allrecords', {allrecs: result }); 
    });
});


// ==================================================
// Route to view one specific record. Notice the view is one record 
// URL: http://localhost:3033/saleorder/2/show
// ================================================== 

router.get('/:recordid/show', function(req, res, next) 
{
    let query = "SELECT order_id, saledate, paymentstatus, authorizationnum, customer_id FROM saleorder WHERE order_id = " + req.params.recordid;

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
            res.render('saleorder/onerec', {onerec: result[0] });
        }
    });
});


// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3033/saleorder/addrecord
// ==================================================

router.get('/addrecord', function(req, res, next) 
{
    res.render('saleorder/addrec');
});


// ================================================== 
// Route to obtain user input and save in database. 
// ================================================== 

router.post('/', function(req, res, next) 
{
    let insertquery = "INSERT INTO saleorder (saledate, paymentstatus, authorizationnum, customer_id) VALUES (?, ?, ?, ?)";
             
    db.query(insertquery,
        [req.body.saledate, req.body.paymentstatus, req.body.authorizationnum, req.body.customer_id],
        (err, result) => 
        { 
            if (err) 
            {
                console.log(err); 
                res.render('error');
            } 
            else 
            {
                res.redirect( '/saleorder'); 
            }
    });
});



// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3033/saleorder/2/edit
// ================================================== 

router.get('/:recordid/edit', function(req, res, next) 
{
    let query = "SELECT order_id, saledate, paymentstatus, authorizationnum, customer_id FROM saleorder WHERE order_id = " + req.params.recordid;
      
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
            res.render('saleorder/editrec', {onerec: result[0] });
       }
    });    
});



// ================================================== 
// Route to save edited data in database.
// ================================================== 

router.post('/save', function(req, res, next) 
{
    let updatequery = "UPDATE saleorder SET saledate = ?, paymentstatus = ?, authorizationnum = ?, customer_id = ? WHERE order_id = " + req.body.order_id;

    db.query(updatequery,
        [req.body.saledate, req.body.paymentstatus, req.body.authorizationnum, req.body.customer_id],
        (err, result) => 
        {
            if (err) 
            {
                console.log(err);
                res.render('error');
            } 
            else 
            {
                res.redirect( '/saleorder'); 
            }
        });
});


// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3033/saleorder/2/delete
// ================================================== 

router.get('/:recordid/delete', function(req, res, next) 
{
    let query = "DELETE FROM saleorder WHERE order_id = " +  req.params.recordid;

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
                res.redirect( '/saleorder');
            } 
    });
});

module.exports = router;