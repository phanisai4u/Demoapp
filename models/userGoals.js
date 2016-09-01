
var mongoose = require('../db');
var Schema = mongoose.Schema;

// create a schema
var userGoalSchema = new Schema({
  type: { type: String, required: true },
  goalId:{ type: String, required: true, unique: true },
  userId:{ type: String, required: true, unique: false },
  cycles : String, 
  days : String ,
  calToBurn : String,
  subtype:String,
  title:String,
  status:Number,
  imageUrl:String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it

function random (low, high) {
    return Math.random() * (high - low) + low;
}
userGoalSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;
  this.goalId = String(Math.floor(100000 + Math.random() * 900000));

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
    
  next();
})

var UserGoal = mongoose.model('UserGoal', userGoalSchema);



// make this available to our users in our Node applications
module.exports = UserGoal;