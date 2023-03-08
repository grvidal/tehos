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
// URL: http://localhost:3033/review/
// ==================================================

router.get('/', adminonly, function(req, res, next) 
{
     let query = "SELECT review_id, reviewdate, comments, rating, status, customer_id, product_id FROM review";

    // execute query
    db.query(query, (err, result) => 
    {
        if (err) 
        { 
            console.log(err);
            res.render('error');
        }

        res.render('review/allrecords', {allrecs: result }); 
    });
});




// ==================================================
// Route to view one specific record. Notice the view is one record 
// URL: http://localhost:3033/review/2/show
// ================================================== 

router.get('/:recordid/show', adminonly, function(req, res, next) 
{
    let query = "SELECT review_id, reviewdate, comments, rating, status, customer_id, product_id FROM review WHERE review_id = " + req.params.recordid;

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
            res.render('review/onerec', {onerec: result[0] });
        }
    });
});





// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3033/review/addrecord
// ==================================================

router.get('/addrecord', adminonly, function(req, res, next) 
{
    res.render('review/addrec');
});


// ================================================== 
// Route to obtain user input and save in database. 
// ================================================== 

router.post('/', function(req, res, next) 
{
    let insertquery = "INSERT INTO review (reviewdate, comments, rating, status, customer_id, product_id) VALUES (?, ?, ?, ?, ?, ?)";
             
    db.query(insertquery,
        [req.body.reviewdate, req.body.comments, req.body.rating, req.body.status, req.body.customer_id, req.body.product_id],
        (err, result) => 
        { 
            if (err) 
            {
                console.log(err); 
                res.render('error');
            } 
            else 
            {
                res.redirect( '/'); 
            }
    });
});





// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3033/review/2/edit
// ================================================== 

router.get('/:recordid/edit', adminonly, function(req, res, next) 
{
    let query = "SELECT review_id, reviewdate, comments, rating, status, customer_id, product_id FROM review WHERE review_id = " + req.params.recordid;
      
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
            res.render('review/editrec', {onerec: result[0] });
       }
    });    
});



// ================================================== 
// Route to save edited data in database.
// ================================================== 

router.post('/save', adminonly, function(req, res, next) 
{
    let updatequery = "UPDATE review SET reviewdate = ?, comments = ?, rating= ?, status= ?, customer_id= ?, product_id = ? WHERE review_id = " + req.body.review_id;

    db.query(updatequery,
        [req.body.reviewdate, req.body.comments, req.body.rating, req.body.status, req.body.customer_id, req.body.product_id],
        (err, result) => 
        {
            if (err) 
            {
                console.log(err);
                res.render('error');
            } 
            else 
            {
                res.redirect( '/review'); 
            }
        });
});


// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3033/review/2/delete
// ================================================== 

router.get('/:recordid/delete', adminonly, function(req, res, next) 
{
    let query = "DELETE FROM review WHERE review_id = " +  req.params.recordid;

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
                res.redirect( '/review');
            } 
    });
});


router.post('/custsubmit', function(req, res, next)
{
    let subdate = new Date();

    if (typeof req.session.customer_id !== 'undefined' && req.session.customer_id)
    {
        res.render('review/custreview', {product_id : req.body.product_id, 
        cust_id : req.session.customer_id, subdate : subdate.toISOString().split('T')[0]})
    }
    else
    {
        res.render('customer/login', {message: "Please Login"});
    }
});

module.exports = router;