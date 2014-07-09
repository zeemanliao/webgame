var fs = require('fs'),
		path = require('path');
var data_path = path.dirname(process.mainModule.filename) + '/lib/components/';
var Routes = {};

module.exports = function (game) {

	fs.readdirSync(data_path).forEach(function (filename) {

	  if (!/\.js$/.test(filename)) {
	    return;
	  }
		console.log('Load Game Components......' + filename);

	  var name = path.basename(filename, '.js');

	  var _routes = require('../components/' + name);

	  _routes.game = game;

	  Routes[name] = _routes;
	  
	});
	return Routes;
}
