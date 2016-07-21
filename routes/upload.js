var express = require('express');
var router = express.Router();
var _ = require('underscore'),
 	AWS = require('aws-sdk'),
 	fs = require('fs'),
 	path = require('path'),
 	flow = require('flow');

 configPath = path.join(__dirname, '..', "config.json");

 AWS.config.loadFromPath(configPath);

router.post('/image', function (req, res,next) {
  console.log(req.files);
    
    res.json(req.files);
     console.log("upload start")
 	var s3 = new AWS.S3(),
 		file = req.file,
 		result = {
 			error: 0,
 			uploaded: []
 		};

 	flow.exec(
 		function() { // Read temp File
            console.log("exe1");
            console.log(file.path);
 			fs.readFile(file.path, this);
 		},
 		function(err, data) { // Upload file to S3
            console.log("exe2");

 			s3.putObject({
 				Bucket: 'myfitness', //Bucket Name
 				Key: file.originalname, //Upload File Name, Default the original name
 				Body: data,
                ACL: "public-read",
                ContentType: "image/jpeg"
               // StorageClass: "REDUCED_REDUNDANCY"
 			}, this);
 		},
 		function(err, data) { //Upload Callback
                        console.log("exe3");

 			if (err) {
 				console.error('Error : ' + err);
 				result.error++;
 			}
 			result.uploaded.push(data.ETag);
 			this();
 		},
 		function() {
            console.log("exe4")
            var url = "https://s3-us-west-2.amazonaws.com/myfitness/"+file.originalname
 			return res.send({"url":s3.getSignedUrl()});
 		});
 });

module.exports = router;
