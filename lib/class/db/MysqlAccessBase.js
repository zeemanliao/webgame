var settings = require('../../settings');
var mysql = require('mysql');
var pool = mysql.createPool(settings.db);

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
				return null;

			return results[0];
		});
	}

	update:function(sql, results, callback) {
	  pool.getConnection(function(err, connection) {
	    if (err)
	      return callback(err);

	    connection.query(sql, results, function(err, result) {
	      connection.release();

	      if (err)
	          return callback(err, result.affectedRows);

	    });
	  });
	}
}