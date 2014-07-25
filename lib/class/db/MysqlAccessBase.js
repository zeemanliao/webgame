var settings = require('../../settings');
var mysql = require('mysql');
var tool = require('../../util/tool');
var pool = mysql.createPool(settings.db);

module.exports = {
	select:function(tableName, paras, callback) {
	  pool.getConnection(function(err, connection) {
	    if (err)
	      return callback(err);

	    connection.query("SELECT * FROM " + tableName + " WHERE ? ", paras, function(err, results) {

	      connection.release();

	      if (err)
	          return callback(err);

	      if (!results[0])
	          return callback(null, null);

	      return callback(null, results);
	    });
	  });
	},

	selectFirstRow:function(tableName, paras, callback) {
		this.select(tableName, paras, function(err, results){
			if (err)
				return callback(err);

			if (!results)
				return callback(null, null);

			return callback(null, results[0]);
		});
	},

	update:function(tableName, id, setData, callback) {
		pool.getConnection(function(err, connection){
			if (err)
				return callback(err);

			connection.query('UPDATE ' + tableName +' SET ? WHERE ?', [setData, id],
				function(err, result){
					connection.release();

		      if (err)
		          return callback(err, null);

		      return callback(null, result.affectedRows);
				});
		});
	},

	delete:function(tableName, id, callback) {
		pool.getConnection(function(err, connection){
			if (err)
				return callback(err);

			connection.query('DELETE FROM ' + tableName +' WHERE ?', id,
				function(err, result){
					connection.release();

		      if (err)
		          return callback(err, null);

		      return callback(null, result.affectedRows);
				});
		});
	},

	insert:function(tableName, id, callback) {
		pool.getConnection(function(err, connection){
			if (err)
				return callback(err);

			connection.query('INSERT INTO ' + tableName +' SET ?', id,
				function(err, result){
					connection.release();

		      if (err)
		          return callback(err, null);

		      return callback(null, result.affectedRows);
				});
		});
	}
}