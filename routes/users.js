var User = require('../models/usermodel'); //require('./models/usermodel.js');

var express = require('express'),
    AWS = require('aws-sdk'),
    path = require('path'),
 	fs = require('fs');
var router = express.Router();
var shortid = require('shortid');
configPath = path.join(__dirname, '..', "config.json");

 AWS.config.loadFromPath(configPath);

/* GET users listing. */
//var chris = new User({
//  name: 'Chris',
//  username: 'sevilayha',
//  password: 'password' 
//});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function random (low, high) {
    return Math.random() * (high - low) + low;
}
router.post('/create', function (req, res,next) {
  var newuser;
  console.log("POST: ");
  console.log(req.body);
  newuser = new User({
    email: req.body.email,
    userId : shortid.generate(),
    password : req.body.password,
    facebookId : req.body.facebookId,
    googleId : req.body.googleId,
    accesstoken : req.body.accesstoken
    
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
          console.log(err);

      return res.send({"msg":"user alredy exits",status:0});
    }
  });
});

router.post('/login', function (req, res,next) {
console.log("POST: ");
  console.log(req.body);
  var loginquery  = User.findOne({ email: req.body.email }).select('+password')
        
     loginquery.exec( function(err, user) {
         if (!err) {
            console.log(user);
             if (user != null){
                 console.log("+++++++++++++++++");
            console.log(user.password + req.body.password);
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
   var query = User.findOne({ userId: req.body.userId })
                         
    query.exec( function(err, user) {
        console.log ("update ...........")
        //console.log(JSON.stringify(user))
       if (!err) {
         if (user != null){

         user.lname = req.body.lname;
         user.fname = req.body.fname;
         user.dob = req.body.dob;
         user.age = req.body.age;
         user.adress = req.body.adress;
         user.mobile = req.body.mobile;
         user.email = req.body.email;
         user.gender =req.body.gender;
         user.height = req.body.height;
         user.weight = req.body.weight;
         user.goals = req.body.goals;
         user.fitnesslevel = req.body.fitnesslevel;
         user.activityLevel = req.body.activityLevel;
         user.picture = req.body.picture;
             
           user.save(function (err) {
            if (!err){
               user = user.toObject(); // swap for a plain javascript object instance
               delete user["_id"];
               delete user["__v"];
               delete user["password"];
              // delete user1["dob"];
               var updateduser = {user:user,"msg":"sucess",status:1};
               console.log(updateduser);
                return res.send(updateduser);
           }else{
                 return res.send({"msg":"invalid data",status:0,"error":err});
   
                     }
               });
         }else{
            return res.send({"msg":"invalid user",status:0});

         }
             
        }else{
            return res.send({"msg":"Error",status:0});
  
        }
        
        });
    
  
});

router.post('/addgoal', function (req, res,next) {
  console.log("POST: ");
  console.log(req.body);
   var query = User.findOne({ userId: req.body.userId })
                         
    query.exec( function(err, user) {
        console.log(JSON.stringify(user))
       if (!err) {
         if (user != null){
         user.goals = req.body.goals;
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

router.post('/fileupload', function (req, res) {
   console.log(req.body.record.name);
 var s3 = new AWS.S3();
    
 var params = {  
     ACL : "public-read",
     Bucket: 'myfitness',
     Key: req.body.record.name,
     Body: fs.createReadStream(req.body.record.path)
 };
 s3.upload(params, function(err, data) {
   if (err) {
    return res.status(500).send(err);
   }
   res.jsonp(data);
 });
});

module.exports = router;
