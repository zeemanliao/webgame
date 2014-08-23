var fs = require('fs'),
		path = require('path');
var data_path = path.dirname(process.mainModule.filename) + '/data/';
//var data_path = '../rdata/';

var GameData = {version:{}};



putData('areas', 'areas');
putData('builds', 'builds');
putData('enemys', 'enemys');
putData('maps', 'maps');
putData('stones', 'stones');
putData('items', 'equipments');
putData('skills', 'skills');


function putData(dataName, dataFileName) {
	var data = require(data_path + dataFileName + '.json');
	console.log('Load Public Data......' + dataFileName);

	if (!GameData[dataName])
		GameData[dataName] = {};

	var c = GameData[dataName];
	for (var i in data) {
			if (c[data[i].id]) {
				console.log('(file:%s) id:%s資料重複', dataFileName, data[i].id);
			}else{
				c[data[i].id]=data[i];
			}
	}
	if (isNaN(GameData.version[dataName]))
		GameData.version[dataName] = 0;
	GameData.version[dataName] += fs.statSync(data_path + dataFileName + '.json').mtime.getTime()
}
module.exports = GameData;
