//// grab the things we need
//var mongoose = require('mongoose');
//
////local db
////mongoose.connect('mongodb://localhost/Demoapp');
//
////mlabs db 
//mongoose.connect('mongodb://root:password@ds015962.mlab.com:15962/phanidb');

var mongoose = require('../db');
var Schema = mongoose.Schema;

// create a schema
var workoutSchema = new Schema({
  type: String,
  wid:String,
  discription: String,
  images: [String],
  videos:[String],
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it

function random (low, high) {
    return Math.random() * (high - low) + low;
}
workoutSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at && !this.wid)
    this.wid = String(Math.floor(100000 + Math.random() * 900000));
    this.created_at = currentDate;
console.log("workout added");
  next();
})

var Workout = mongoose.model('Workout', workoutSchema);

// make this available to our users in our Node applications
module.exports = Workout;