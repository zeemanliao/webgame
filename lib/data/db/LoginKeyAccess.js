var db = require('./MysqlAccessBase');

module.exports = {
	loginkeyLimitTime:50,

	getPlayerIDByLoginKey:function(loginKey, callback) {
		var data = [loginKey, this.loginkeyLimitTime];

		db.selectFirstRow('SELECT playerID FROM loginkey WHERE loginKey = ? And UNIX_TIMESTAMP(now())-UNIX_TIMESTAMP(createTime) < ?', data,
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

	deleteLoginKey:function(loginKey, callback){
  	db.update('DELETE FROM loginkey WHERE loginKey = ?', loginKey,
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