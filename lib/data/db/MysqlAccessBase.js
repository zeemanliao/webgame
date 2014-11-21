var tool = require('../../util');
var appInfo = tool.require('package.json');
var mysql = require('mysql');
var pool = mysql.createPool(appInfo.database);

module.exports = {
	select:function(sql, paras, callback) {
	  pool.getConnection(function(err, connection) {
	    if (err)
	      return callback(err);

	    connection.query(sql, paras, function(err, results) {

	      connection.release();

	      if (err)
	          return callback(err);

	      if (!results[0])
	          return callback(null, null);

	      return callback(null, results);
	    });
	  });
	},

	selectFirstRow:function(sql, paras, callback) {
		this.select(sql, paras, function(err, results){
			if (err)
				return callback(err);

			if (!results)
				return callback(null, null);

			return callback(null, results[0]);
		});
	},

	update:function(sql, paras, callback) {
		this.select(sql, paras, function(err, result){
			if (err)
				return callback(err);

			if (!result)
				return callback(null, null);

			return callback(null, result.affectedRows);
		});
	}
}