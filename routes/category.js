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
// URL: http://localhost:3033/category/
// ==================================================

router.get('/', adminonly, function(req, res, next) 
{
     let query = "SELECT category_id, categoryname, description FROM category";

    // execute query
    db.query(query, (err, result) => 
    {
        if (err) 
        { 
            console.log(err);
            res.render('error');
        }

        res.render('category/allrecords', {allrecs: result }); 
    });
});


// ==================================================
// Route to view one specific record. Notice the view is one record 
// URL: http://localhost:3033/category/2/show
// ================================================== 

router.get('/:recordid/show', function(req, res, next) 
{
    let query = "SELECT category_id, categoryname, description FROM category WHERE category_id = " + req.params.recordid;

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
            res.render('category/onerec', {onerec: result[0] });
        }
    });
});


// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3033/category/addrecord
// ==================================================

router.get('/addrecord', adminonly, function(req, res, next) 
{
    res.render('category/addrec');
});


// ================================================== 
// Route to obtain user input and save in database. 
// ================================================== 

router.post('/', adminonly, function(req, res, next) 
{
    let insertquery = "INSERT INTO category (categoryname, description) VALUES (?, ?)";
             
    db.query(insertquery,
        [req.body.categoryname, req.body.description],
        (err, result) => 
        { 
            if (err) 
            {
                console.log(err); 
                res.render('error');
            } 
            else 
            {
                res.redirect( '/category'); 
            }
    });
});



// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3033/category/2/edit
// ================================================== 

router.get('/:recordid/edit', adminonly, function(req, res, next) 
{
    let query = "SELECT category_id, categoryname, description FROM category WHERE category_id = " + req.params.recordid;
      
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
            res.render('category/editrec', {onerec: result[0] });
       }
    });    
});



// ================================================== 
// Route to save edited data in database.
// ================================================== 

router.post('/save', adminonly, function(req, res, next) 
{
    let updatequery = "UPDATE category SET categoryname = ?, description = ? WHERE category_id = " + req.body.category_id;

    db.query(updatequery,
        [req.body.categoryname, req.body.description],
        (err, result) => 
        {
            if (err) 
            {
                console.log(err);
                res.render('error');
            } 
            else 
            {
                res.redirect( '/category'); 
            }
        });
});


// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3033/category/2/delete
// ================================================== 

router.get('/:recordid/delete', adminonly, function(req, res, next) 
{
    let query = "DELETE FROM category WHERE category_id = " +  req.params.recordid;

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
                res.redirect( '/category');
            } 
    });
});

module.exports = router;