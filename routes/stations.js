//require mongodb
var mongo = require('mongodb');

//set the server, database and bson
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

//set the server to the default mongo server port 27017
var server = new Server('localhost', 27017, {auto_reconnect: true});
	db = new Db('jcDecauxDB', server);//select the correct db

db.open(function(err, db){

	if(!err){
		console.log("Stations Route - Connected to 'jcDecauxDB' database");

		db.collection('locations', {strict:true}, function(err, collection){

			console.log("Stations Route - Opening 'locations' collection");

			if(err){
				console.log("Stations Route - The 'locations' collection doesnt exist. Creating it with JCDecaux Data...");
			}
		});
	};
});

//findById function
exports.findByNumber = function(req, res){
	
	//set the id var to the requests number parameter
	var number = parseInt(req.params.number);

	console.log("REQ PARAMS: " + number);
	console.log('Stations Route - Retrieving Station: ' + number);

	//find the station with the requested number
	db.collection('locations', function(err, collection){
		collection.find({'number': number}).toArray(function(err, items){
			//respond with the found stations
			res.send(items);
			console.log(items.length);
		});
	});
};

























