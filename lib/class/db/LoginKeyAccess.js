var db = require('./MysqlAccessBase');
var settings = require('../../settings');

module.exports = {
	loginkeyLimitTime:settings.default.loginkeyLimitTime,

	getPlayerIDByLoginKey:function(keyID, callback) {
		var data = [keyID, this.loginkeyLimitTime];

		db.selectFirstRow('SELECT playerID FROM loginkey WHERE keyID = ? And UNIX_TIMESTAMP(now())-UNIX_TIMESTAMP(createTime) < ?', data,
		function(err, result) {
			if (err)
				return callback(err);
			
			if (result)
				return callback(null, result.playerID);

			return callback(null, null);
		});
	},

	saveLoginKey:function(data, callback){
  	db.update('INSERT INTO loginkey SET ?', data,
  	function(err, affectedRows){
  		if (err)
  			return callback(err);

  		return callback(null);
  	});
	},

	deleteLoginKey:function(keyID, callback){
  	db.update('DELETE FROM loginkey WHERE keyID = ?', keyID,
  	function(err, affectedRows){
  		if (err)
  			return callback(err);

  		return callback(null);
  	});
	},

	deleteOverTime:function(callback) {
		db.update('DELETE FROM loginkey WHERE UNIX_TIMESTAMP(now())-UNIX_TIMESTAMP(createTime)>=?', this.loginkeyLimitTime,
		function(err, affectedRows){
			if (err)
				return callback(err);

			return callback(null);
		});
	}
};