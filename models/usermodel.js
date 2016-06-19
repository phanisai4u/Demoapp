// grab the things we need
var mongoose = require('mongoose');

//local db
//mongoose.connect('mongodb://localhost/Demoapp');

//mlabs db 
mongoose.connect('mongodb://root:password@ds015962.mlab.com:15962/phanidb');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true ,select:false},
  email: { type: String, required: true, unique: true },
  fname: String,
  lname: String,
  picture: String,
  age: Number,
  dob: String,
  gender: String,
  height: String,
  weight: String,
  fitnesslevel: String,
  activityLevel: String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it

userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
})

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;