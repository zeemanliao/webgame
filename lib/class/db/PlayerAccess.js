var db = require('./MysqlAccessBase');
var mysql = require('mysql');
var settings = require('../../settings');
var tableName = 'player';
var tool = require('../../util/tool');

var baseData = {};
var realTimeData = {};

function getChangeData(id) {
    var _changeData = {};
    var _baseData = baseData[id];

    for (var i in _baseData) {

        if (_baseData[i] != realTimeData[id][i]) {
          _changeData[i] = realTimeData[id][i];
        }
    }
    return _changeData;
}

function updateChangeData(id) {
	baseData[id] = {};

	for (var i in realTimeData[id])	{
		baseData[id][i] = realTimeData[id][i];
	}
}

module.exports = {
	getByID:function(id, callback) {
		if (realTimeData[id])
			return callback(null, realTimeData[id]);

		db.selectFirstRow('SELECT * FROM ' + tableName +' WHERE id = ?', id,
		function(err, result) {
			if (err)
				return callback(err);
			
			return callback(null, result);
		});
	},

	getByAccount:function(account, callback) {
		db.selectFirstRow('SELECT * FROM ' + tableName +' WHERE acc = ?', account,
		function(err, result) {
			if (err)
				return callback(err);
			
			return callback(null, result);
		});
	},

	getByAccountOrName:function(data, callback) {
		db.selectFirstRow('SELECT * FROM ' + tableName +' WHERE nam = ? or acc=?', data,
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
		updateChangeData(data.id);
	},

	save:function(id, callback){
		if (!tool.isNumeric(id))
			return callback(new Error('錯誤的PlayerID:'+id));

    var _data = getChangeData(id);

    if (Object.keys(_data).length > 0) {
    	db.update('UPDATE ' + tableName +' SET ? WHERE id=' + id, _data,
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