var db = require('./MysqlAccessBase');
var mysql = require('mysql');
var tableName = 'items';
module.exports = {
	getByPlayerID:function(playerID, callback) {

		db.select(tableName, {playerid:playerID},
		function(err, result) {
			if (err)
				return callback(err);
			
			return callback(null, result);
		});
	},

	create:function(data, callback) {
  	db.insert(tableName, data,
  	function(err, affectedRows){
  		if (err)
  			return callback(err);

  		if (affectedRows == 0)
  			return callback(null, 0);
  		
  		db.selectFirstRow('SELECT max(id) as lastID from items', null, function(err, result){
  			if (err)
  				return callback(err);

  			return callback(null, result.lastID);
  		});
  	});
	},

	save:function(data, callback){
  	db.update(tableName, {id:data.id}, data,
  	function(err, affectedRows){
  		if (err)
  			return callback(err);

  		return callback(null, affectedRows);
  	});
	},

	getCacheData:function(id) {
		return realTimeData[id];
	},

	getBaseData:function(id) {
		return baseData[id];
	}
};