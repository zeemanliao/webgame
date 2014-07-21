var fs = require('fs'),
		path = require('path');
var data_path = path.dirname(process.mainModule.filename) + '/data/';
//var data_path = '../rdata/';
var version = {};
var GameData = {};
fs.readdirSync(data_path).forEach(function (filename) {

  if (!/\.json$/.test(filename)) {
    return;
  }

  console.log('Load Public Data......' + filename);
  var name = path.basename(filename, '.json');
  var data = require(data_path + filename);
  var c = GameData[name] = {};

	for (var i in data) {
			if (c[data[i].id]) {
				console.log('(file:%s) id:%s資料重複',filename,data[i].id);
			}else{
				c[data[i].id]=data[i];
			}
	}
	version[name] = fs.statSync(data_path + name + '.json').mtime.getTime()
});
GameData.version = version;
module.exports = GameData;
