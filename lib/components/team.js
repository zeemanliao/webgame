var tool = require('../util/tool.js');
var Player = require('../class/Player');

module.exports = {
	getTeamByMap:function(map, callback) {
		var _teamList = [];
		
		for (var i in map.teams){
			var team = map.teams[i];
			if (!team.isFull())
				_teamList.push(team.getTeamData());
		}
		callback(null, _teamList);
		
	}
}