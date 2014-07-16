var fs = require('fs'),
		path = require('path');
var data_path = path.dirname(process.mainModule.filename) + '/lib/routes/';
//var data_path = '../routes/';
var Routes = {};

module.exports = function (game) {
	fs.readdirSync(data_path).forEach(function (filename) {

	  if (!/\.js$/.test(filename)) {
	    return;
	  }
		console.log('Load Route......' + filename);

	  var name = path.basename(filename, '.js');

	  var _routes = require(data_path + name);

	  _routes.game = game;

	  Routes[name] = _routes;
	  
	});
	return Routes;
}
