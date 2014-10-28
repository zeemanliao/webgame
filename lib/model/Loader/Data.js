var loader = require('./Loader');

module.exports = function () {
	var _obj = loader('data');
	var _returnObj = {};

	for (var i in _obj) {
		var _count = 0;
		var _data = _obj[i];
		var _returnData = _returnObj[i] = {};

		for ( var j in _data) {
			if (_returnData[_data[j].id]) {
				console.log('(file:%s) id:%s資料重複', i, _data[j].id);
			} else {
				_count ++;
				_returnData[_data[j].id] = _data[j];
			}
		}
		console.log('publicData %s\t(%s).....loaded', i, _count);
	}
}