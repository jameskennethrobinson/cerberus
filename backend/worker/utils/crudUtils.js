var _ = require('underscore');

var db = require('../../db/mongodb-data/config.js');
var Beach = require('../../db/models/beach.js');
var apiUtils = require('./apiUtils.js');
var spotData = require('./json/beachData.json');
var Promise = require('bluebird');


var writeBeachEntry = function(beachData) {
	return new Promise (function (resolve, reject) {
		Beach.find({mswId: beachData.mswId}).then(function(beach){
			if (!beach.length) {
				new Beach({
					mswId: beachData.mswId,
					beachname: beachData.beachName,
					lat: beachData.lat,
					lon: beachData.lon,
					description: 'this is a beach',
					tweets: ['test'],
					forecastData: ['test']
				}).save(function(err) {
					if (err) {
						reject(err);
					}
					resolve('save successfull');
				});
			} else {
				reject(new Error('Beach already exists'));
			} 
		});
	});
};
	


//async-map like util to iterate over beachData (used in conjunction with writeBeachEntry)
exports.writeBeachEntries = function(cb){
	var beachData = spotData;
	(function recurse(ind){
		console.log('executing item #', ind);
		if (ind === beachData.length) {
			cb('All entries written');
			return;
		}
		writeBeachEntry(beachData[ind])
			.then(function(success) {
				console.log(success);
				recurse(++ind);
			})
			.catch(function(err) {
				console.log(err)
			})
	}).call(this,0);


};

//API endpoints for retrieving beach data from Mongo
exports.retrieveBeachData = function (cb) {
  Beach.find({})
  	.then(function(data){
  		cb(data);
  	})
};

//filters beach JSON data into 24-hour period
exports.filterBeachDataTime = function(data){
	var parsedData = JSON.parse(data);
	var time = Math.floor( (Date.now()/1000) );
	return _.filter(parsedData, function(datum){
		return datum.localTimestamp > time && datum.localTimestamp < (time + 86402);
	});
};
