var Excercie = require('../models/exerciemodel') //require('./models/usermodel.js');

var express = require('express');
var router = express.Router();


router.post('/add', function (req, res,next) {
  var newExcercie;
  console.log("POST: ");
  console.log(req.body);
  newExcercie = new Excercie({
    type : req.body.type,
    subtype : req.body.subtype,
    title : req.body.title,
    media : req.body.media,
    discription :req.body.discription
  });
  newExcercie.save(function (err) {
    if (!err) {
        newExcercie = newExcercie.toObject() // swap for a plain javascript object instance
               delete newExcercie["_id"];
               delete newExcercie["__v"];
               var resdata = {Excercie:newExcercie,"msg":"sucess",status:1};
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
  var getallExcerciesquery  = Excercie.find({ });
        
     getallExcerciesquery.exec( function(err, Excercies) {
         if (!err) {
             var Excerciesdata = [];
               for (var i=0; i<Excercies.length; i++){
              var Excercie = Excercies[i].toObject() // swap for a plain javascript object instance
               delete Excercie["_id"];
               delete Excercie["__v"];
                   Excerciesdata.push(Excercie);
           }
             
               var Excercielists = {Excercielists:Excerciesdata,"msg":"sucess",status:1};
                return res.send(Excercielists);
        
         }else{
         return res.send({"msg":"Error",status:0});
         }
        });
});

router.post('/clearall', function (req, res,next) {
  console.log(req.body);
  var removeallExcerciesquery  = Excercie.remove({}, function(err) {
            if (err) {
                 return res.send({"msg":"Error",status:0});
            } else {
                 return res.send({"msg":"sucess",status:1});
            }
        }
    );
});

router.post('/delete', function (req, res,next) {
  console.log(req.body);
  var removeExcerciesquery  = Excercie.remove({ exericeId: req.body.exericeId }, function(err) {
            if (err) {
                 return res.send({"msg":"Error",status:0});
            } else {
                 return res.send({"msg":"sucess",status:1});
            }
        }
    );
});


module.exports = router;