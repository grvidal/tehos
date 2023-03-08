var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

function adminonly(req,res,next)
{
  if (!req.session.isadmin)
  {
    return res.redirect('customer/login');
  }
  next();
}

// ================================================== 
// Route Provide Login Window
// URL: http://localhost:3033/customer/login
// ================================================== 
router.get('/login', function(req, res, next) 
{
    res.render('customer/login', {message: "Please Login"});
});



// ================================================== 
// Route Check Login Credentials
// ================================================== 
router.post('/login', function(req, res, next) 
{
    let query = "select customer_id, firstname, lastname, passcode, isadmin from customer WHERE username = '" + req.body.username + "'"; 
    // execute query
    db.query(query, (err, result) => 
    {
        if (err) 
        {
            res.render('error');
        } 
        else 
        {
            if(result[0])
            {
                // Username was correct. Check if password is correct 
                bcrypt.compare(req.body.passcode, result[0].passcode, 
                function(err, result1) 
                {
                    if(result1) 
                    {
                        // Password is correct. Set session variables for user.
                        var isadmin = false;
                        req.session.isadmin = isadmin;
                        var custid = result[0].customer_id;
                        req.session.customer_id = custid;
                        var custname = result[0].firstname + " "+ result[0].lastname; 
                        req.session.custname = custname;
                        if(result[0].isadmin)
                        {
                            req.session.isadmin = true;
                        }

                        res.redirect('/');
                    }
                    else 
                    {
                        // password do not match
                        res.render('customer/login', {message: "Wrong Password"});
                    }
                });
            }
            else 
            {
                res.render('customer/login', {message: "Wrong Username"});
            }
        }
    });
});


// ================================================== 
// Route Check Login Credentials
// URL: http://localhost:3033/customer/logout
// ================================================== 
router.get('/logout', function(req, res, next) 
{
    req.session.customer_id = 0; 
    req.session.custname = ""; 
    req.session.cart=[]; 
    req.session.qty=[]; 
    req.session.isadmin = false;
    res.redirect('/');
});


// ==================================================
// Route to list all records. Display view to list all records 
// URL: http://localhost:3033/customer/
// ==================================================
router.get('/', adminonly, function(req, res, next) 
{
     let query = "SELECT customer_id, firstname, lastname, city, state  FROM customer";

    // execute query
    db.query(query, (err, result) => 
    {
        if (err) 
        { 
            console.log(err);
            res.render('error');
        }

        res.render('customer/allrecords', {allrecs: result }); 
    });
});


// ==================================================
// Route to view one specific record. Notice the view is one record 
// URL: http://localhost:3033/customer/2/show
// ================================================== 
router.get('/:recordid/show', adminonly, function(req, res, next) 
{
    let query = "SELECT customer_id, firstname, lastname, dob, email, phone, address1, address2, city, state, zip, username, passcode FROM customer WHERE customer_id = " + req.params.recordid;

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
            res.render('customer/onerec', {onerec: result[0] });
        }
    });
});


// ================================================== 
// Route Enable Registration
// URL: http://localhost:3033/customer/register
// ================================================== 
router.get('/register', function(req, res, next) 
{
    res.render('customer/addrec');
});


// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3033/customer/addrecord
// ==================================================
router.get('/addrecord', adminonly, function(req, res, next) 
{
    res.render('customer/addrec');
});


// ================================================== 
// Route to obtain user input and save in database. 
// ================================================== 
router.post('/', function(req, res, next) 
{
    let insertquery = "INSERT INTO customer (firstname, lastname, dob, email, phone, address1, address2, city, state, zip, username, passcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
             
    bcrypt.genSalt(10, (err, salt) => 
    { 
        bcrypt.hash(req.body.passcode, salt, (err, hash) => 
        {
            if(err) 
            { 
                res.render('error');
            }
    
            db.query(insertquery,
            [req.body.firstname, req.body.lastname, req.body.dob,req.body.email, req.body.phone, req.body.address1, req.body.address2, req.body.city,req.body.state, req.body.zip, req.body.username, hash],
            (err, result) => 
            { 
                if (err) 
                {
                    console.log(err); 
                    res.render('error');
                } 
                else 
                {
                    res.redirect( '/customer'); 
                }
            });
        });
    });
});


// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3033/customer/2/edit
// ================================================== 
router.get('/:recordid/edit', adminonly, function(req, res, next) 
{
    let query = "SELECT customer_id, firstname, lastname, dob, email, phone, address1, address2, city, state, zip, username, passcode FROM customer WHERE customer_id = " + req.params.recordid;
      
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
            res.render('customer/editrec', {onerec: result[0] });
       }
    });    
});



// ================================================== 
// Route to save edited data in database.
// ================================================== 
router.post('/save', adminonly, function(req, res, next) 
{
    let updatequery = "UPDATE customer SET firstname = ?, lastname = ?, dob = ?, email = ?, phone = ?, address1 = ?, address2 = ?, city = ?, state = ?, zip = ?, username = ?, passcode = ? WHERE customer_id = " + req.body.customer_id;

    db.query(updatequery,
        [req.body.firstname, req.body.lastname, req.body.dob, req.body.email, req.body.phone, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.username, req.body.passcode],
        (err, result) => 
        {
            if (err) 
            {
                console.log(err);
                res.render('error');
            } 
            else 
            {
                res.redirect( '/customer'); 
            }
        });
});


// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3033/customer/2/delete
// ================================================== 
router.get('/:recordid/delete', adminonly, function(req, res, next) 
{
    let query = "DELETE FROM customer WHERE customer_id = " +  req.params.recordid;

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
                res.redirect( '/customer');
            } 
    });
});

module.exports = router;