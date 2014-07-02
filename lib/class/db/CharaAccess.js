var db = require('./MysqlAccessBase');
var clone = require('../../util/clone');

var baseData = {};
var realTimeData = {};

function getChangeData(id) {
    var _changeData = {};

    for (var i in baseData) {
        if (baseData[i] != realTimeData[i]) {
            _changeData[i] = baseData[i];
        }
    }
    return changeData;
}

function updateChangeData(id) {
	baseData[id] = {};
	clone(realTimeData[id], baseData[id]);
}

module.exports = {
	getByID:function(id, callback) {
		if (realTimeData[id])
			return callback(null, realTimeData[id]);

		db.selectFirstRow('SELECT * FROM chara WHERE id = ?', id,
		function(err, result) {
			if (err)
				return callback(err);
			
			return callback(null, result);
		});
	},

	getByAccount:function(account, callback) {
		db.selectFirstRow('SELECT * FROM chara WHERE acc = ?', account,
		function(err, result) {
			if (err)
				return callback(err);
			
			return callback(null, result);
		});
	},

	getByAccountOrName:function(data, callback) {
		db.selectFirstRow('SELECT * FROM chara WHERE nam = ? or acc=?', data,
		function(err, result) {
			if (err)
				return callback(err);
			
			return callback(null, result);
		});
	},

	putCacheData:function(data) {
		if (realTimeData[data.id])
			return;

		realTimeData[data.id] = data;
		useAccountFindID[data.acc] = data.id;
	},

	save:function(id, callback){
    var _data = getChangeData(id);

    if (Object.keys(_data).length > 0) {
    	db.update('UPDATE chara SET ? WHERE id=' + id, _data,
    	function(err, affectedRows){
    		if (err)
    			return callback(err);

    		updateChangeData(id);
    		return callback(null);
    	});
    }
	}
};