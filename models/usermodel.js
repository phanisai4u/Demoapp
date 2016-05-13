// grab the things we need
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Demoapp');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fname: String,
  lname: String,
  age: Number,
  dob: Date,
  gender: String,
  height: String,
  activityLevel: String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;