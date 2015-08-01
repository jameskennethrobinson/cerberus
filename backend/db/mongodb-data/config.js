//nodem modules
var mongoose = require('mongoose');
//mongoose config
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/thesis';
mongoose.connect(uri);

//opens initial connection
//Run in seperate terminal window using " mongod --dbpath . " in "./db" directory
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open on', uri);
});

//exports db for use in other files
module.exports = db;
