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
    username: req.body.email,
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

router.post('/login', function (req, res,next) {
console.log("POST: ");
  console.log(req.body);
    User.find({ username: req.body.email }, function(err, user) {
       if (err) throw err;
        console.log(user);
        var user1 = user[0];
        if (user1.password === req.body.password){
           return res.send(user1); 
        }else{
            return res.send('invalid password');
        }
         
        });
});

router.post('/update', function (req, res,next) {
  console.log("POST: ");
  console.log(req.body);
    User.find({ username: req.body.email }, function(err, user) {
       if (err) throw err;
        console.log(user);
        var user1 = user[0];
         user1.lname = req.body.lanme;
         user1.fname = req.body.fname;
         user1.dob = req.body.dob;
         user1.age = req.body.age;
         user1.email = req.body.email;
         user1.gender =req.body.gender;
         user1.height = req.body.height;

           user1.save(function (err) {
            console.log(user1);

            if (err) throw err;
                return res.send(user1);
               });
        
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
