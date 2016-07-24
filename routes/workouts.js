var Workout = require('../models/workoutsmodel'); //require('./models/usermodel.js');
var express = require('express');
var router = express.Router();

var User = require('../models/usermodel');
router.post('/add', function (req, res,next) {
  var newworkout;
  console.log("POST: ");
  console.log(req.body);
 
  newworkout = new Workout({
    images: req.body.images,
    videos: req.body.videos,
    type : req.body.type,
    title : req.body.title,
    discription : req.body.discription,
    name : req.body.name,
    uploadBy: req.body.uploadBy,
    subName : req.body.subName,
    mainMuscle : req.body.mainMuscle,
    otherMuscles : req.body.otherMuscles,
    level : req.body.level,
    sport : req.body.sport,
    force :  req.body.force,
    avgRating : req.body.avgRating
  });
  newworkout.save(function (err) {
    if (!err) {
        newworkout = newworkout.toObject() // swap for a plain javascript object instance
               delete newworkout["_id"];
               delete newworkout["__v"];
               var resdata = {workout:newworkout,"msg":"sucess",status:1};
               console.log(resdata);
               return res.send(resdata);

    } else {
        return res.send(err);
      //return res.send({"msg":"uploading error",status:0});
    }
  });
});

router.post('/getall', function (req, res,next) {
console.log("POST: ");
  console.log(req.body);
  var getallworkoutsquery  = Workout.find({ });
        
     getallworkoutsquery.exec( function(err, workouts) {
         if (!err) {
             var workoutsdata = [];
               for (var i=0; i<workouts.length; i++){
              var workout = workouts[i].toObject() // swap for a plain javascript object instance
               delete workout["_id"];
               delete workout["__v"];
                   workoutsdata.push(workout);
           }
             
               var workoutlists = {workoutlists:workoutsdata,"msg":"sucess",status:1};
                return res.send(workoutlists);
        
         }else{
         return res.send({"msg":"Error",status:0});
         }
        });
});

router.post('/clearall', function (req, res,next) {
  console.log(req.body);
  var removeallworkoutsquery  = Workout.remove({}, function(err) {
            if (err) {
                 return res.send({"msg":"Error",status:0});
            } else {
                 return res.send({"msg":"sucess",status:1});
            }
        }
    );
               

        
//     removeallworkoutsquery.exec( function(err) {
//         if (!err) {
//            return res.send({"msg":"sucess",status:1});
//         }else{
//         return res.send({"msg":"Error",status:0});
//         }
//        });
});
module.exports = router;
