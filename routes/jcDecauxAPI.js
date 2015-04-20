// var mongo = require('mongodb');
var rest = require('restler'); // Http Client Library

/*var Server = mongo.Server,
	Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
	db = new Db('jcDecauxDB', server);

db.open(function(err, db){

	if(!err){
		console.log("Connected to 'jcDecauxDB' database");

		db.collection('stations', {strict:true}, function(err, collection){

			if(err){
				console.log("The 'stations' collection doesnt exist. Creating it with JCDecaux Data...");
				retrieveData();
			}
		});
	};
});
*/
exports.findAll = function(req, res){

	var url = "https://api.jcdecaux.com/vls/v1/";
	var stations = "stations";

	/*An API Key will need to be retrieved from the JCDecaux Developer site
	This is free and only requires a registration with the site
	Include your own key in the variable below.*/

	var apiKey = "";
	var contract = "dublin";

	console.log('jcDecauxAPI Route - Retrieving all Stations');

	rest.get(url + stations, {query:{contract: contract, apiKey: apiKey}}).on('complete', function(result, response){

		/*db.collection('stations', function(err, collection){
			collection.insert(result, {safe:true}, function(err, result){});
		});*/

		res.send(result);
	});
};

exports.findByNumber = function(req, res){

	var url = "https://api.jcdecaux.com/vls/v1/";
	var stations = "stations/";
	var number = req.params.number;
	var contract = "dublin";

	/*An API Key will need to be retrieved from the JCDecaux Developer site
	This is free and only requires a registration with the site
	Include your own key in the variable below.*/

	var apiKey = "";
	console.log('jcDecauxAPI Route - Retrieving Station: ' + number);

	rest.get(url + stations + number, {query:{contract: contract, apiKey: apiKey}}).on('complete', function(result, response){
		res.send(result);
	});
};

/*function retrieveData(){

	var url = "https://apiKey.jcdecaux.com/vls/v1/";
	var stations = "stations";

	/*An API Key will need to be retrieved from the JCDecaux Developer site
	This is free and only requires a registration with the site
	Include your own key in the variable below.*/

	/*var apiKey = "";

	rest.get(url + stations, {query:{contract: "dublin", apiKeyKey: apiKey}}).on('complete', function(result, response){

		db.collection('stations', function(err, collection){
			collection.insert(result, {safe:true}, function(err, result){});

		});

		response.send(result);
	});
}*/