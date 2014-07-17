var db = require('./MysqlAccessBase');
var mysql = require('mysql');
var settings = require('../../settings');
var pool = mysql.createPool(settings.db);


module.exports = {
	getByPlayerID:function(playerID, callback) {
		if (realTimeData[id])
			return callback(null, realTimeData[id]);

		db.selectFirstRow('SELECT * FROM equment WHERE playerid = ?', playerID,
		function(err, result) {
			if (err)
				return callback(err);
			
			return callback(null, result);
		});
	},

	save:function(playerID, callback){
		if (!tool.isNumeric(playerID))
			return callback(new Error('錯誤的PlayerID:'+id));
    var _data = getChangeData(id);

    if (Object.keys(_data).length > 0) {
    	db.update('UPDATE player SET ? WHERE id=' + pool.escape(playerID), _data,
    	function(err, affectedRows){
    		if (err)
    			return callback(err);

    		updateChangeData(id);
    		return callback(null);
    	});
    }
	},

	getCacheData:function(id) {
		return realTimeData[id];
	},

	getBaseData:function(id) {
		return baseData[id];
	}
};