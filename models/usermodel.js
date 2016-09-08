// grab the things we need
//var mongoose = require('mongoose');
//
////local db
////mongoose.connect('mongodb://localhost/Demoapp');
//
////mlabs db 
//mongoose.connect('mongodb://root:password@ds015962.mlab.com:15962/phanidb');

var mongoose = require('../db');

var Schema = mongoose.Schema;
var shortid = require('shortid');

// create a schema
var goalSchema = new Schema ({
     goalid:{type: String, required: false, unique: true },
     type : String,
     status: String,
     subType:String,
     title : String,
     cycles : String, 
     days : String ,
     calToBurn : String,
     created_at: Date,
     updated_at: Date

});
var Goal = mongoose.model('Goal', goalSchema);

var userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true ,select:false},
  email: { type: String, required: false, unique: true },
  fname: String,
  lname: String,
  picture: String,
  age: Number,
  adress: String,
  facebookId:String,
  googleId:String,
  accesstoken:String,
  mobile:String,
  dob: String,
  gender: String,
  height: String,
  weight: String,
  fitnesslevel: String,
  activityLevel: String,
  goals : [{type: Schema.Types.ObjectId, ref: 'Goal'}],
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
 if (!this.created_at ) 
    this.created_at = currentDate;
  
    

  next();
})



goalSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;
  

   // if created_at doesn't exist, add to that field
    if (!this.created_at ){
        this.goalid = shortid.generate();
        this.created_at = currentDate;
     } 
  next();
})

var User = mongoose.model('User', userSchema);


// make this available to our users in our Node applications
//module.exports = User;

module.exports = {
    User: User,
    Goal: Goal
};
