var fs = require('fs'),
		path = require('path');
var data_path = path.dirname(process.mainModule.filename) + '/lib/routes/';
var Routes = {};

module.exports = function (game) {
	console.log('.......Start Load route');
	fs.readdirSync(data_path).forEach(function (filename) {

	  if (!/\.js$/.test(filename)) {
	    return;
	  }
		console.log('Load route......' + filename);

	  var name = path.basename(filename, '.js');

	  var _routes = require('../routes/' + name);

	  _routes.game = game;

	  Routes[name] = _routes;
	  
	});
	console.log('.......End Load route');
	return Routes;
}
