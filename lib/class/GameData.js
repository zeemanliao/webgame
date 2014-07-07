var fs = require('fs'),
		path = require('path');
var data_path = path.dirname(process.mainModule.filename) + '/data/';
var version = {};
var GameData = {};
console.log('.......Start Load Public Data');
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
				console.log('(file:$) id:$資料重複',file,data[i].id);
			}else{
				c[data[i].id]=data[i];
			}
	}
	version[name] = fs.statSync(data_path + name + '.json').mtime.getTime()
});
console.log('.......End Load Public Data');
GameData.version = version;
module.exports = GameData;
