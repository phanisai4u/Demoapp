var User = require('../models/usermodel') //require('./models/usermodel.js');

var express = require('express');
var router = express.Router();


/* GET users listing. */
//var chris = new User({
//  name: 'Chris',
//  username: 'sevilayha',
//  password: 'password' 
//});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function (req, res,next) {
  var newuser;
  console.log("POST: ");
  console.log(req.body);
  newuser = new User({
    email: req.body.email,
    username: req.body.username,
    password : req.body.password
  });
  newuser.save(function (err) {
    if (!err) {
      return res.send(newuser)

    } else {
      return res.send(err);
    }
  });
});


//router.get('/newuser', function(req, res, next) {
//    
//    chris.save(function(err) {
//  if (err) throw err;
//  res.send('User saved successfully!');
//
//  console.log('User saved successfully!');
//});
//    
//});

module.exports = router;
