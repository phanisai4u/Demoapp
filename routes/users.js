var express = require('express');
var router = express.Router();
//var User = require('./models/usermodel');

/* GET users listing. */
//var chris = new User({
//  name: 'Chris',
//  username: 'sevilayha',
//  password: 'password' 
//});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
