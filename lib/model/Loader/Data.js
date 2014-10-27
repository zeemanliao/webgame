var loader = require('./Loader');

module.exports = function () {
	var _obj = loader('data');

	for (var i in _obj) {
		console.log('load publicData ' + i + ' .....ok');
	}
}