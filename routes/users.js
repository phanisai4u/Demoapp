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
        newuser = newuser.toObject(); // swap for a plain javascript object instance
               delete newuser["_id"];
               delete newuser["__v"];
               delete newuser["password"];
               var updateduser = {user:newuser,"msg":"sucess",status:1};
               console.log(updateduser);
               return res.send(updateduser);

    } else {
      return res.send({"msg":"user alredy exits",status:0});
    }
  });
});

router.post('/login', function (req, res,next) {
console.log("POST: ");
  console.log(req.body);
  var loginquery  = User.findOne({ username: req.body.email }).select('+password')
        
     loginquery.exec( function(err, user) {
         if (!err) {
            console.log(user);
             if (user != null){
            if (user.password === req.body.password){
            user = user.toObject(); // swap for a plain javascript object instance
               delete user["_id"];
               delete user["__v"];
               delete user["password"];
              // delete user1["dob"];
               var updateduser = {user:user,"msg":"sucess",status:1};
               console.log(updateduser);
                return res.send(updateduser);
             }else{
                return res.send({"msg":"invalid password",status:0});
             }
             }else{
                return res.send({"msg":"invalid user",status:0});
  
             }
         }else{
         return res.send({"msg":"Error",status:0});
         }
        });
});

router.post('/update', function (req, res,next) {
  console.log("POST: ");
  console.log(req.body);
   var query = User.findOne({ username: req.body.email })
                         
    query.exec( function(err, user) {
        console.log(JSON.stringify(user))
       if (!err) {
         if (user != null){

         user.lname = req.body.lname;
         user.fname = req.body.fname;
         user.dob = req.body.dob;
         user.age = req.body.age;
         user.email = req.body.email;
         user.gender =req.body.gender;
         user.height = req.body.height;
           user.save(function (err) {
            if (err) throw err;
               user = user.toObject(); // swap for a plain javascript object instance
               delete user["_id"];
               delete user["__v"];
               delete user["password"];
              // delete user1["dob"];
               var updateduser = {user:user,"msg":"sucess",status:1};
               console.log(updateduser);
                return res.send(updateduser);
               });
         }else{
            return res.send({"msg":"invalid user",status:0});

         }
             
        }else{
            return res.send({"msg":"Error",status:0});
  
        }
        
        });
    
  
});


module.exports = router;
