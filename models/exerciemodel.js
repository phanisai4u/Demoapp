
var mongoose = require('../db');
var Schema = mongoose.Schema;

// create a schema
var exericeSchema = new Schema({
  type: String,
  exericeId:String,
  subtype:String,
  title:String,
  media : [String],
  discription: String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it

function random (low, high) {
    return Math.random() * (high - low) + low;
}
exericeSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;
  this.exericeId = String(Math.floor(100000 + Math.random() * 900000));

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
console.log("Exerice added");
  next();
})

var Exerice = mongoose.model('Exerice', exericeSchema);



// make this available to our users in our Node applications
module.exports = Exerice;