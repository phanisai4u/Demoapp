// grab the things we need
var mongoose = require('mongoose');

//local db
//mongoose.connect('mongodb://localhost/Demoapp');

//mlabs db 
mongoose.connect('mongodb://root:password@ds015962.mlab.com:15962/phanidb');

module.exports = mongoose;