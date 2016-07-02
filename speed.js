var mqtt = require('mqtt');

var url = "mqtt://m12.cloudmqtt.com";

var MongoClient = require('mongodb').MongoClient;

var options = {
  port: 18584,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'dtdrzwrt',
  password: 'T2nn8rRcnVBM',
};

var client = mqtt.connect(url, options);

client.on('connect', function() {

  client.subscribe('location', function() {
	client.on('message', function(topic, message, packet) {
		var object = JSON.parse(message);	
		updateSpeedViewInMongoDB(object.user,object);
    });
  });
  
});

var updateSpeedViewInMongoDB = function(id,data) {
	
	MongoClient.connect('mongodb://test:test@ds021969.mlab.com:21969/cloud', function(err, db) {
		if (err) {
			throw err;
		}
		db.collection('locations').save({_id:id,data},function(err, result) {
			if (err) {
				throw err;
			} 
			console.log('Speed view updated in Mongo DB: ' + JSON.stringify(data));
		});
	});
	
};