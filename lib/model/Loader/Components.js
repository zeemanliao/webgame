var loader = require('./Loader');

module.exports = function () {
	var _obj = loader('lib/components');

	for (var i in _obj) {
		console.log('Components %s\t.....loaded', i);
	}

	return _obj;
}