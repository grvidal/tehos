var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records 
// URL: http://localhost:3033/packaging/
// ==================================================

router.get('/', function(req, res, next) 
{
     let query = "SELECT packaging_id, tracking_number, shipper, packagingweight, packaginglength, packagingwidth, order_id FROM packaging";

    // execute query
    db.query(query, (err, result) => 
    {
        if (err) 
        { 
            console.log(err);
            res.render('error');
        }

        res.render('packaging/allrecords', {allrecs: result }); 
    });
});


// ==================================================
// Route to view one specific record. Notice the view is one record 
// URL: http://localhost:3033/packaging/2/show
// ================================================== 

router.get('/:recordid/show', function(req, res, next) 
{
    let query = "SELECT packaging_id, tracking_number, shipper, packagingweight, packaginglength, packagingwidth, order_id FROM packaging WHERE packaging_id = " + req.params.recordid;

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
            res.render('packaging/onerec', {onerec: result[0] });
        }
    });
});


// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3033/packaging/addrecord
// ==================================================

router.get('/addrecord', function(req, res, next) 
{
    res.render('packaging/addrec');
});


// ================================================== 
// Route to obtain user input and save in database. 
// ================================================== 

router.post('/', function(req, res, next) 
{
    let insertquery = "INSERT INTO packaging (tracking_number, shipper, packagingweight, packaginglength, packagingwidth, order_id) VALUES (?, ?, ?, ?, ?, ?)";
             
    db.query(insertquery,
        [req.body.tracking_number, req.body.shipper, req.body.packagingweight, req.body.packaginglength, req.body.packagingwidth, req.body.order_id],
        (err, result) => 
        { 
            if (err) 
            {
                console.log(err); 
                res.render('error');
            } 
            else 
            {
                res.redirect( '/packaging'); 
            }
    });
});



// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3033/packaging/2/edit
// ================================================== 

router.get('/:recordid/edit', function(req, res, next) 
{
    let query = "SELECT packaging_id, tracking_number, shipper, packagingweight, packaginglength, packagingwidth, order_id FROM packaging WHERE packaging_id = " + req.params.recordid;
      
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
            res.render('packaging/editrec', {onerec: result[0] });
       }
    });    
});



// ================================================== 
// Route to save edited data in database.
// ================================================== 

router.post('/save', function(req, res, next) 
{
    let updatequery = "UPDATE packaging SET tracking_number = ?, shipper = ?, packagingweight = ?, packaginglength = ?, packagingwidth = ?, order_id = ? WHERE packaging_id = " + req.body.packaging_id;

    db.query(updatequery,
        [req.body.tracking_number, req.body.shipper, req.body.packagingweight, req.body.packaginglength, req.body.packagingwidth, req.body.order_id],
        (err, result) => 
        {
            if (err) 
            {
                console.log(err);
                res.render('error');
            } 
            else 
            {
                res.redirect( '/packaging'); 
            }
        });
});


// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3033/packaging/2/delete
// ================================================== 

router.get('/:recordid/delete', function(req, res, next) 
{
    let query = "DELETE FROM packaging WHERE packaging_id = " +  req.params.recordid;

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
                res.redirect( '/packaging');
            } 
    });
});

module.exports = router;