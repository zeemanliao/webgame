var loader = require('./Loader');

module.exports = function () {
	var _obj = loader('lib/actions');

	for (var i in _obj) {
		console.log('Actions %s\t.....loaded', i);
	}

	return _obj;
}