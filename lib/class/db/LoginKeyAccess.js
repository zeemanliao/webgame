var db = require('./MysqlAccessBase');

module.exports = {
	getByLoginKey:function(id, callback) {
		if (realTimeData[id])
			return callback(null, realTimeData[id]);

		db.selectFirstRow('SELECT * FROM loginkey WHERE keyID = ?', id,
		function(err, result) {
			if (err)
				return callback(err);
			
			return callback(null, result);
		});
	},

	saveLoginKey:function(data, callback){
    var _data = getChangeData(id);

    if (Object.keys(_data).length > 0) {
    	db.update('INSERT INTO loginkey (keyID,playerID) VALUES (?,?)', _data,
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