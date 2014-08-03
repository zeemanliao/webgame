var db = require('./MysqlAccessBase');
var mysql = require('mysql');

module.exports = {
	getByPlayerID:function(playerID, callback) {

		db.select('SELECT * FROM items WHERE playerid = ?', playerID,
		function(err, result) {
			if (err)
				return callback(err);
			
			return callback(null, result);
		});
	},

	create:function(data, callback) {
  	db.update('INSERT INTO items SET ?', data,
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
  	db.update('UPDATE items SET ? WHERE id=?', [data, data.id],

  	function(err, affectedRows){
  		if (err)
  			return callback(err);

  		return callback(null, affectedRows);
  	});
	},

	delete:function(data, callback){
  	db.update('DELETE FROM items WHERE id=? and playerID=?', [data.id, data.playerID],
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