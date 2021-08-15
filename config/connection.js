var config = require('./config');

var db_env= process.env.DB_ENV?process.env.DB_ENV:"mysql";

var current_env= process.env.NODE_ENV?process.env.NODE_ENV:"production";

var connection;

switch(current_env){

	case 'mysql':
		connection=getMySqlConnection();
	break;

	case 'mongo':
		default:
		connection=getMongoConnection();
	break;

}

if(connection){
	console.log(`Connection made successfully with ${db_env}`)
}

function getMySqlConnection(){

		var mysql = require('mysql');

		return mysql.createConnection({
			host: config[db_env][current_env].host,
			user: config[db_env][current_env].user,
			password: config[db_env][current_env].password,
			database: config[db_env][current_env].database
		});
}


function getMongoConnection(){

		var mongoose = require('mongoose');

		var host=config[db_env][current_env].host;
		var user=config[db_env][current_env].user;
		var password=config[db_env][current_env].password;
		var database=config[db_env][current_env].database;

		//Set up default mongoose connection
		var mongoDB = `mongodb://${host}/${database}`;
		mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

		//Get the default connection
		return mongoose.connection;
}

module.exports=connection;